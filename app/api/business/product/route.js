import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/prisma/client";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    // 1) auth & role check
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    if (session.user.role !== "BUSINESS")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // 2) parse fields + file
    const form = await request.formData();
    const name = form.get("name");
    const description = form.get("description");
    const price = form.get("price");
    const category = form.get("category");
    const url = form.get("url");
    const image = form.get("image");

    // 3) basic validation
    if (!name || typeof name !== "string")
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!description || typeof description !== "string")
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    if (!price || isNaN(Number(price)))
      return NextResponse.json(
        { error: "Valid price is required" },
        { status: 400 }
      );
    if (!category || typeof category !== "string")
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    
    // 4) upload to Vercel Blob
    const pathname = `products/${session.user.businessId}/${Date.now()}-${image.name || "upload"}`;

    let mainImage = null;
    if (image) {
      const { url } = await put(
        pathname,
        image,
        {
          access: "public",
          contentType: image.type,
          orgId: process.env.VERCEL_ORG_ID,
          projectId: process.env.VERCEL_PROJECT_ID,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        }
      );
      mainImage = url;
    }

    // 5) create in Prisma
    const product = await prisma.product.create({
      data: {
        name: form.get("name"),
        description: form.get("description"),
        price: Number(price),
        category,
        url: url || null,
        mainImage,
        seller: { connect: { id: session.user.businessId } },
      },
    });

    return NextResponse.json({ product, message: "Product created successfully" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
