"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">About Me</span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-xl overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-500/20">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Jorge Mesquita"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold mb-4 text-white">Hello, I'm Jorge Mesquita</h3>
                <p className="text-gray-300 mb-4">
                  I'm a passionate developer and designer with expertise in creating immersive digital experiences. With
                  a strong foundation in both front-end and back-end technologies, I bring creative ideas to life
                  through clean, efficient code and stunning visuals.
                </p>
                <p className="text-gray-300 mb-6">
                  My journey in tech began with a curiosity about how things work, which evolved into a career building
                  innovative solutions for clients across various industries. I specialize in React, Three.js, and
                  modern UI/UX design principles.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["React", "Three.js", "TypeScript", "Node.js", "TailwindCSS", "WebGL"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-700 text-sm text-gray-300 rounded-full border border-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
