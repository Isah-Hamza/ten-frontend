import React from 'react'

type NewsLetterProps = {
    styles?: string;
}

const NewsLetter = ({ styles }: NewsLetterProps) => {
  return (
            <section className={` my-20 px-[5%] flex flex-col items-center  ${styles}`}>
                <h2 className="text-2xl font-bold"> NewsLetter </h2>
                <p className="my-7 text-center sm:text-left">Subscribe to our newsletter to get news on happening directly to your inbox.</p>
                <div className="flex flex-col md:flex-row items-center  overflow-hidden ">
                    <input type="text" placeholder='user@example.com' className="bg-[rgba(62,64,149,0.09)] rounded-md md:rounded-r-none px-4 w-80 h-[50px] py-3 mb-1 md:mb-0 outline-none" />

                    <button className="flex items-center space-x-4 px-16 py-3 h-full border border-[coral] bg-[coral] text-white rounded-md md:rounded-l-none">
                        <span>
                            Subscribe
                        </span>
                    </button>
                </div>
            </section>
  )
}

export default NewsLetter