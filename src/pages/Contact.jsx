
import { useState } from 'react'
import { Mail, MessageCircle, Send, MapPin, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setSubmitted(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Frontend demo: no message is sent to a server yet.
    setSubmitted(true)

    setForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <section className="ru-page">
      <div className="container py-5">

        {/* Header */}
        <div className="text-center mb-5">
          <div className="text-success mb-3">
            <MessageCircle size={48} />
          </div>

          <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2 mb-3">
            Get in Touch
          </span>

          <h1 className="ru-serif display-5 fw-bold mb-3">
            Contact Us
          </h1>

          <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
            Have a question, suggestion, or need help?
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="row g-4 justify-content-center">

          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="rounded-4 p-4 h-100"
              style={{ backgroundColor: '#eaf4ed' }}>

              <h3 className="ru-serif fw-bold mb-3">
                Let's Talk
              </h3>

              <p className="text-muted mb-4">
                Your feedback helps us make ReUse Market better
                for everyone.
              </p>

              <div className="d-flex gap-3 mb-4">
                <div className="text-success">
                  <Mail size={25} />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Email</h6>
                  <p className="text-muted mb-0">
                    Send us your questions through the contact form.
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <div className="text-success">
                  <MessageCircle size={25} />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Support</h6>
                  <p className="text-muted mb-0">
                    We're happy to hear your suggestions and feedback.
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3">
                <div className="text-success">
                  <MapPin size={25} />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Our Platform</h6>
                  <p className="text-muted mb-0">
                    ReUse Market — A second life for everything.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">

              <h3 className="ru-serif fw-bold mb-4">
                Send Us a Message
              </h3>

              {submitted && (
                <div className="alert alert-success d-flex gap-2 align-items-center">
                  <CheckCircle size={20} />
                  Thank you! Your message was submitted in this demo.
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control py-2"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control py-2"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control py-2"
                    placeholder="What is your message about?"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn ru-btn w-100 py-2">
                  Send Message <Send size={18} className="ms-2" />
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
