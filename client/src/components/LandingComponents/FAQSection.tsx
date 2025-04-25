"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface FAQItem {
  question: string
  answer: string
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FAQItem[] = [
    {
      question: "Is Sunrise safe to use?",
      answer:
        "Yes, the application is very secure, with bank-level security encryption to protect your data.",
    },
    {
      question: "Can I invite multiple team members?",
      answer:
        "Yes, you can invite unlimited team members with our Standard plan.",
    },
    {
      question: "What happens if I need to cancel my subscription?",
      answer:
        "You can cancel your subscription at any time. Your data will remain accessible until the end of your billing period.",
    },
    {
      question: "Does Sunrise support different currencies?",
      answer:
        "Yes, Sunrise supports multiple currencies for international users and teams.",
    },
    {
      question: "How does the personalized financial advice feature work?",
      answer:
        "Our AI-powered system analyzes your usage patterns and provides tailored recommendations to improve your productivity.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
            <span className="text-gray-300">Wasting time</span>
            <br />
            Say Goodbye to <span className="text-blue-500">Messy Schedule</span>
            <br />
            <span className="text-gray-300">Lack of integrations</span>
          </h2>
          <p className="text-gray-600 mt-4">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openIndex === index}
              onOpenChange={() => toggleFAQ(index)}
            >
              <div className="border-b border-gray-200 pb-4">
                <CollapsibleTrigger className="flex justify-between items-center w-full text-left py-4 focus:outline-none">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 text-gray-600">
                  {faq.answer}
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
