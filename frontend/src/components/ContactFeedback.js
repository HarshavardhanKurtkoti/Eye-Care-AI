import React, { useState } from "react";

const ContactFeedback = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    // Open mail client with prefilled content
    const mailto = `mailto:kurtkoti.harsha@gmail.com?subject=Vision AI Feedback from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.name + ' (' + form.email + ')')}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="max-w-2xl mx-auto my-16 p-8 site-card rounded-2xl shadow-sm">
      <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white text-center">Contact / Feedback</h2>
      <p className="text-slate-600 dark:text-slate-300 text-center mb-6">Have feedback or questions? Send a quick note—no storage, no marketing.</p>
      {submitted ? (
        <div className="text-green-700 dark:text-green-300 text-center text-lg font-semibold py-8">
          Thank you for your feedback! Your email client should open automatically.<br />If not, please email <a href="mailto:kurtkoti.harsha@gmail.com" className="underline">kurtkoti.harsha@gmail.com</a>.
        </div>
      ) : (
        <form className="space-y-6 contact-form" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border input-border bg-input text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border input-border bg-input text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-3 py-2 rounded-md border input-border bg-input text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {error && <div className="text-red-600 font-semibold">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 btn-primary text-white font-bold rounded-md shadow"
          >
            Send Feedback
          </button>
          <div className="text-slate-500 text-xs text-center">Your message opens your email client—no data is stored by this app.</div>
        </form>
      )}
    </section>
  );
};

export default ContactFeedback;
