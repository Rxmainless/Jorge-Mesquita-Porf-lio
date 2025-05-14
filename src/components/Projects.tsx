"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "3D Product Configurator",
    description: "Interactive 3D product visualization tool built with Three.js and React",
    tags: ["Three.js", "React", "WebGL"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description: "Admin dashboard with real-time analytics and inventory management",
    tags: ["React", "Node.js", "Chart.js"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "Content creation tool powered by machine learning algorithms",
    tags: ["Python", "TensorFlow", "React"],
    image: "/placeholder.svg?height=400&width=600",
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group"
    >
      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl transition-all duration-300 group-hover:shadow-purple-500/20 group-hover:border-purple-500/50">
        <div className="relative overflow-hidden">
          <div className="aspect-video">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <button className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center">
            View Project
            <svg
              className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              Featured Projects
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
              View All Projects
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
