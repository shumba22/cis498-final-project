import CategorySelector from "@/components/products/category-selector";
import dynamic from "next/dynamic";
import SearchBar from "@/components/ui/search-bar";
import {
  FiChevronRight as ChevronRight,
  FiCode as Code,
  FiPackage as Package,
  FiLayers as Layers,
  FiUsers as Users,
  FiLock as Lock,
  FiTag as Tag,
  FiBarChart2 as BarChart,
} from "react-icons/fi";
import FeaturedProducts from "@/components/products/featured-components";

export default function HomePage() {
  const categories = [
    { id: "all", name: "All Tools" },
    { id: "plugins", name: "Plugins" },
    { id: "themes", name: "Themes" },
    { id: "extensions", name: "Extensions" },
    { id: "libraries", name: "Libraries" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Developer Tools Marketplace
              </h1>
              <p className="text-xl mb-6">
                Discover premium plugins, themes, and extensions to supercharge
                your development workflow
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-xl">
                <button className="bg-white font-bold text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                  Browse Tools
                </button>
                <button href="/auth/register" className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition">
                  Become a Seller
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl">
                <Code size={160} className="text-white/90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <SearchBar />

      {/* Categories */}
      <section className="py-12">
        <CategorySelector categories={categories} />
      </section>

      {/* Featured Tools */}
      <section className="py-8 ">
        <div className="container mx-auto px-4">
          <FeaturedProducts />
          <div className="flex justify-between items-center mt-6">
            <a
              href="/products"
              className="text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-indigo-800 ">
            Why Choose Our Platform
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Curated Tools</h3>
              <p className="text-gray-600">
                Handpicked, high-quality developer tools that meet strict
                quality standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Secure payment processing and immediate access to purchased
                tools.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Developer Community</h3>
              <p className="text-gray-600">
                Join a community of developers sharing and discovering quality
                tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seller Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Become a Seller</h2>
              <p className="text-lg mb-6">
                Share your developer tools with a global audience of developers
                and earn money for your creations.
              </p>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
                Start Selling
              </button>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                <div className="flex items-center mb-2">
                  <Tag className="h-5 w-5 mr-2" />
                  <span className="font-medium">Competitive Pricing</span>
                </div>
                <p className="text-sm text-white/80">
                  Set your own prices and keep a high percentage of sales.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                <div className="flex items-center mb-2">
                  <Layers className="h-5 w-5 mr-2" />
                  <span className="font-medium">Easy Distribution</span>
                </div>
                <p className="text-sm text-white/80">
                  We handle hosting, distribution and payment processing.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                <div className="flex items-center mb-2">
                  <BarChart className="h-5 w-5 mr-2" />
                  <span className="font-medium">Sales Analytics</span>
                </div>
                <p className="text-sm text-white/80">
                  Detailed analytics and insights about your sales.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="font-medium">Global Audience</span>
                </div>
                <p className="text-sm text-white/80">
                  Reach developers worldwide with your tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Dev Tools Platform</h3>
              <p className="text-gray-400">
                The marketplace for premium developer tools, plugins, and
                themes.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Plugins
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Themes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Extensions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Libraries
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8">
            <p className="text-gray-500 text-center">
              © 2025 Developer Tools Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
