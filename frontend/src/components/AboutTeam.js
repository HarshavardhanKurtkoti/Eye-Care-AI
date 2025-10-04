import React from "react";

const TEAM = [
  {
    name: "Harshavardhan Kurtkoti",
    role: "Full-Stack Developer & AI Engineer",
    desc: "Solo creator of Vision AI. Designed, developed, and deployed the entire platform, including dataset curation, model training, backend API, and modern frontend. Passionate about AI for healthcare and building impactful solutions."
  }
  // Add more team members here if needed
];

const AboutTeam = () => (
  <section id="about" className="max-w-3xl mx-auto my-16 p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-blue-700 transition-colors duration-300">
    <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center">About / Team</h2>
    <div className="mb-6 text-gray-800 dark:text-gray-100 text-base text-center">
      <p>
        Vision AI is a research and educational project to demonstrate the power of deep learning for medical image analysis. The platform was built end-to-end, from dataset curation and model training to a modern, user-friendly web interface and robust backend API.
      </p>
    </div>
    <div className="flex flex-col items-center gap-6">
      {TEAM.map((member, idx) => (
        <div key={idx} className="w-full md:w-2/3 bg-blue-50/70 dark:bg-gray-800/70 rounded-xl border border-blue-100 dark:border-blue-700 shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-1">{member.name}</div>
          <div className="text-blue-700 dark:text-blue-300 font-semibold mb-2">{member.role}</div>
          <div className="text-gray-700 dark:text-gray-200 text-center">{member.desc}</div>
        </div>
      ))}
    </div>
    <div className="mt-8 text-center text-sm text-blue-700 dark:text-blue-300">
      <span className="font-semibold">Contact:</span> <a href="mailto:kurtkoti.harsha@gmail.com" className="underline hover:text-blue-500">kurtkoti.harsha@gmail.com</a>
    </div>
  </section>
);

export default AboutTeam;
