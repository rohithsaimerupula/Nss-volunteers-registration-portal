"use client";

import { motion } from "framer-motion";
import { Heart, BookOpen, UserCheck, Users, Calendar, Target } from "lucide-react";

const reasons = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Serve",
    description: "Contribute your time and skills to meaningful community initiatives."
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Learn",
    description: "Develop leadership, communication, teamwork, and organizational skills."
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: "Lead",
    description: "Take responsibility and work with students and coordinators to create impact."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Connect",
    description: "Meet people, collaborate with teams, and become part of a larger service community."
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Experience",
    description: "Participate in campaigns, awareness programs, events, and community activities."
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Impact",
    description: "Turn your effort into meaningful action that benefits society."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function WhyJoinSection() {
  return (
    <section id="why-join" className="py-24 relative bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4"
          >
            Why Become an NSS Volunteer?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Join a community of changemakers and develop yourself while serving others.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group relative bg-surface border border-white/5 p-8 rounded-2xl hover:border-primary/50 hover:bg-surface/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(22,163,74,0.1)]"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{reason.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
