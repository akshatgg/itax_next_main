"use client"
import { useForm } from "react-hook-form"
import { useState } from "react"
import userAxios from "@/lib/userbackAxios"
import { toast } from "react-toastify"
import { Loader2 } from "lucide-react"

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [loading, setLoading] = useState(false)

  const submitHandler = async (formData) => {
    try {
      setLoading(true)
      const response = await userAxios.post("/contactUs/create", {
        ...formData,
      })
      toast.success(response.data.message)
      reset()
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-gray-100 dark:bg-neutral-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Form Section */}
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Got a technical issue? Want to send feedback? Let us know.
            </p>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
                    Your Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    id="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter name"
                  />
                  {errors?.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
                    Your Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="xyz@gmail.com"
                  />
                  {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
                  Subject<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Let us know how we can help you"
                />
                {errors?.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-1">
                  Your Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message", { required: "Message is required" })}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Leave a comment..."
                ></textarea>
                {errors?.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2.5 px-5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-colors disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="py-2.5 px-5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row sm:justify-between mt-6 text-sm">
              <a
                className="text-gray-500 dark:text-gray-400 hover:underline flex items-center mb-2 sm:mb-0"
                href="tel:+918770877270"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +91 8770877270
              </a>
              <a
                className="text-gray-500 dark:text-gray-400 hover:underline flex items-center"
                href="mailto:support@itaxeasy.com"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                support@itaxeasy.com
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="h-full w-full min-h-[300px] md:min-h-full">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4668.759088204337!2d78.1760718502079!3d26.2171536260565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c69faa0547f1%3A0x3996f8cdea3069b!2sItax%20easy%20private%20limited!5e0!3m2!1sen!2sin!4v1676326483432!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Itax Easy Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  )
}
