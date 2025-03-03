"use client"
import { cn } from "@/lib/utils"
import React, { useEffect, useRef } from "react"

const MyComponent = () => {
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const stackArea = useRef<HTMLDivElement>(null)

  function rotateCards() {
    let angle = 0

    cards.current.forEach((card: HTMLDivElement | null, index: number) => {
      if (card) {
        if (card.classList.contains("away")) {
          card.style.transform = `translateY(-120vh) rotate(-48deg)`
        } else {
          card.style.transform = ` rotate(${angle}deg)`
          angle = angle - 10
          card.style.zIndex = (cards.current.length - index).toString()
        }
      }
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const { scrollY, innerHeight } = window
      const docHeight = document.body.offsetHeight

      const _scrollPercentage = Math.round(
        (scrollY / (docHeight - innerHeight)) * 100
      )
      const scrollPercentage = Math.min(100, _scrollPercentage)

      for (const item of cards.current) {
        const index = cards.current.indexOf(item)
        const percentage = (index + 1) * (100 / cards.current.length)
        const away = percentage < scrollPercentage

        if (away) {
          if (!item?.classList.contains("away")) {
            item?.classList.add("away")
          }
        } else {
          if (item?.classList.contains("away")) {
            item?.classList.remove("away")
          }
        }
      }

      rotateCards()
    })

    rotateCards()
  }, [])

  return (
    <div className="mt-5 p02 h-[500vh] flex">
      <div className="h-[100vh]  sticky top-0 flex-1 flex justify-center items-center">
        <h1 className="border-2 border-solid border-black p-5 rounded-md">
          sticky
        </h1>
      </div>
      <div
        className="flex-1 h-[100vh] sticky top-0 flex justify-center items-center right "
        ref={stackArea}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div
              key={index}
              className={cn(
                "my-element border-solid border-2 transition-all duration-1000  h-[20em] w-[20em] rounded-lg absolute p-5",
                [
                  "bg-orange-500",
                  "bg-green-500",
                  "bg-blue-500",
                  "bg-red-500",
                  "bg-purple-500",
                ][index % 5]
              )}
              style={{
                zIndex: 6 - index,
              }}
              ref={(el) => {
                cards.current[index] = el
              }}
            >
              Element {index + 1}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyComponent
