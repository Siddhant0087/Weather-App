import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <div>
	<div class="bg-white text-gray-800 py-20">
		<div class="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
			<div class="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
				<h1 class="text-3xl md:text-5xl p-2 text-blue-700 tracking-loose">TechFest</h1>
				<h2 class="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">Space : The Timeless Infinity
				</h2>
				<p class="text-sm md:text-base text-gray-800 mb-4">You can search different locations or places.</p>
				<Link to="/check"
					class="bg-transparent hover:bg-blue-700  text-blue-700 hover:text-gray-50 rounded hover:animate-pulse shadow hover:shadow-lg py-2 px-4 border border-blue-700 hover:border-transparent">
					Search</Link>
			</div>
			<div class="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
				<div class="h-48 flex flex-wrap content-center">
					<div>
						<img class="inline-block mt-28 hidden xl:block" src="https://user-images.githubusercontent.com/54521023/116969935-c13d5b00-acd4-11eb-82b1-5ad2ff10fb76.png"/></div>
						<div>
							<img class="inline-block hidden lg:block mt-24 md:mt-0 p-8 md:p-0 size-[30vh]"  src="https://www.sod.com/wp-content/uploads/2020/05/Shade-High-Tolerant-min-1536x1536.png"/></div>
							<div>
								<img class="inline-block hidden lg:block mt-28 md:mt-0 p-8 md:p-0 size-[30vh]" src="https://purepng.com/public/uploads/large/weather-forecast-symbol-v7o.png"/></div>
							</div>
						</div>
					</div>
				</div>
    </div>
  )
}
