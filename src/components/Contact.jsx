import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const formRef = useRef();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_hx6719e",
        "template_sz8pzq9",
        formRef.current,
        "EnW_CMRv4UP95ovTD"
      )
      .then(
        () => {
          setSuccess(true);
          setLoading(false);
          formRef.current.reset();
        },
        () => {
          alert(t("contact.error"));
          setLoading(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="min-h-screen px-4 md:px-20 py-12 bg-black text-white flex items-center justify-center"
    >
      <div className="w-full max-w-2xl bg-black p-6 md:p-10 rounded-2xl shadow-xl">
        {success ? (
          <p className="text-center text-green-400 font-medium text-xl">
            {t("contact.success")}
          </p>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-center mb-2">
              {t("contact.title")}
            </h2>

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                {t("contact.name")}
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-xl border-2 border-white bg-black text-white p-3 shadow-sm focus:border-white focus:ring-1 focus:ring-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t("contact.email")}
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border-2 border-white bg-black text-white p-3 shadow-sm focus:border-white focus:ring-1 focus:ring-white"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                {t("contact.message")}
              </label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full rounded-xl border-2 border-white bg-black text-white p-3 shadow-sm focus:border-white focus:ring-1 focus:ring-white resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              {loading ? t("contact.sending") : t("contact.submit")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
