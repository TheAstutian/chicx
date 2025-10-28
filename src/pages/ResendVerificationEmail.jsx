 
const ResendVerificationEmail = () =>{



    const handleChange = e =>{
        return
    }

    return (
        <>
          <>
  <div className="flex flex-col items-center justify-top min-h-screen p-4 bg-gray-50">
    <div className="max-w-xl mx-auto text-center pt-10 space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        Verify Your Email
      </h1>
      <p className="text-lg text-gray-600 max-w-lg mx-auto">
        Please enter your email address to receive your verification link.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <input
          type="email"
          onChange={handleChange}
          name="email"
          id="email"
          className="w-full max-w-md px-5 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors duration-200"
          placeholder="name@company.com"
          required
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-tertiary rounded-lg hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-primary-300 transition-colors duration-200"
        >
          Send Link
        </button>
      </div>
    </div>
  </div>
</>
            </>
        
    )
}

export default ResendVerificationEmail