import { SignIn } from '@clerk/clerk-react' // CLERK AUTH

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* CLERK AUTH — Clerk's SignIn component handles all auth UI */}
      <div className="relative z-10">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl="/account"
        />
      </div>

      {/* Background decorations matching existing style */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none"></div>
    </div>
  )
}

export default SignInPage
