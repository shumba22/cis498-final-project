import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function BusinessIndex() {
  const session = await auth()

  if (!session.user) {
    console.log('User not authenticated')
    return redirect('/auth/login')
  }

  if (!session.user.business) {
    console.log('User not a business')
    return redirect('/auth/login')
  }
  if (!session.user.business.active) {
    console.log('User business not active')
    return redirect('/auth/login')
  }
  
  return redirect('/business/dashboard')
}
