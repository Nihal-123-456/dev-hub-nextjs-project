'use client';

import Image from "next/image";

const ExploreBtn = () => {
  return (
    <button id="explore-btn" type="button" className="mt-5 mx-auto">
        <a href="#events">
            Explore Events 
            <Image src="/icons/arrow-down.svg" alt="arrow-down" width={20} height={20} />
        </a>
    </button>
  )
}

export default ExploreBtn