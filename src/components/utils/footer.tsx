import React from 'react';
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer>
      <section className="bg-[#003459] py-10 px-4 sm:py-16 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="h-64 text-white sm:p-6 ml-6 rounded">
  <h1 className="font-sans mt-4 font-bold text-lg">PRODUCT</h1>
  <ul className=" mt-2 text-[#8E9BAF] font-sans list-none"> {/* Remove default list styling */}
    <li>
      <Link href="/intro" className="hover:text-white">Home</Link>
    </li>
    <li className="mt-2"> {/* Add margin-top for spacing between items */}
      <Link href="/pricing" className="hover:text-white">Pricing</Link>
    </li>
    <li className="mt-2"> {/* Add margin-top for spacing between items */}
      <Link href="/templateshome" className="hover:text-white">Templates</Link>
    </li>
  </ul>
</div>

<div className="h-64 text-white sm:p-6 rounded">
  <h1 className="font-sans mt-4 font-bold text-lg">RESOURCES</h1>
  <ul className=" mt-2 text-[#8E9BAF] font-sans list-none"> {/* Remove default list styling */}
    <li>
      <Link href="/blog" className="hover:text-white">Blog</Link>
    </li>
    <li className="mt-2"> {/* Add margin-top for spacing between items */}
      <Link href="#" className="hover:text-white">Help Center</Link>
    </li>
  </ul>
</div>
         
<div className="h-64 ml-6 text-white sm:p-6 rounded">
  <h1 className="font-sans mt-4 font-bold text-lg">TERMS</h1>
  <ul className=" mt-2 text-[#8E9BAF] font-sans list-none space-y-2"> {/* Added space-y-2 for consistent spacing */}
    <li>
      <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
    </li>
    <li>
      <Link href="/privacy-policy" className="hover:text-white">Privacy policy</Link>
    </li>
  </ul>
</div>

          <div className="h-auto  sm:p-6  rounded">
            <div className=" flex  items-center ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 66" className="h-12 mt-4 w-auto text-[#FFFFFF] switcher-logo">
          
                <path
                  d="M52.22 12.64c.74 0 1.38.26 1.91.79.51.53.76 1.16.76 1.91v.06c0 .74-.25 1.37-.76 1.88-.53.53-1.16.79-1.91.79h-1.67c-1.84 0-3.4.64-4.69 1.93-1.27 1.29-1.92 2.85-1.94 4.69v17.3c0 .74-.26 1.37-.79 1.88-.53.53-1.15.79-1.88.79h-.09c-.72 0-1.35-.26-1.88-.79-.53-.51-.79-1.13-.79-1.88v-17.3c.04-3.34 1.21-6.19 3.52-8.53 2.35-2.35 5.19-3.52 8.53-3.52h1.68zM84.53 17.34c3.13 3.13 4.69 6.9 4.69 11.32V42c0 .74-.26 1.37-.79 1.88-.53.53-1.15.79-1.88.79h-.09c-.72 0-1.35-.26-1.88-.79-.53-.51-.79-1.13-.79-1.88v-1.35c-3.03 2.68-6.56 4.02-10.58 4.02-4.42 0-8.19-1.56-11.32-4.69-3.13-3.13-4.69-6.9-4.69-11.32s1.56-8.19 4.69-11.32c3.13-3.13 6.9-4.69 11.32-4.69 4.42-.01 8.2 1.56 11.32 4.69zm-18.82 3.84c-2.05 2.07-3.08 4.56-3.08 7.48 0 2.93 1.03 5.43 3.08 7.51 2.07 2.05 4.57 3.08 7.51 3.08s5.42-1.03 7.48-3.08c2.07-2.07 3.11-4.57 3.11-7.51 0-2.91-1.04-5.4-3.11-7.48-2.05-2.07-4.54-3.11-7.48-3.11s-5.44 1.03-7.51 3.11zM107.91.62c.74 0 1.38.25 1.91.76.51.53.76 1.16.76 1.91v.06c0 .74-.25 1.38-.76 1.91-.53.51-1.16.76-1.91.76h-1.67c-1.84 0-3.4.64-4.69 1.93-1.27 1.29-1.92 2.85-1.94 4.69v.03h8.3c.74 0 1.38.26 1.91.79.51.51.76 1.13.76 1.88v.06c0 .74-.25 1.38-.76 1.91-.53.53-1.16.79-1.91.79h-8.3v23.89c0 .74-.26 1.37-.79 1.88-.53.53-1.15.79-1.88.79h-.09c-.72 0-1.35-.26-1.88-.79-.53-.51-.79-1.13-.79-1.88V12.64c.04-3.34 1.21-6.18 3.52-8.5 2.35-2.35 5.19-3.52 8.53-3.52h1.68zM117.59 7.07c-.9 0-1.66-.31-2.29-.94-.63-.63-.94-1.39-.94-2.29 0-.88.31-1.63.94-2.26.63-.63 1.39-.94 2.29-.94.88 0 1.63.31 2.26.94.64.63.97 1.38.97 2.26 0 .9-.32 1.66-.97 2.29-.63.63-1.38.94-2.26.94zm.03 5.57c.74 0 1.37.26 1.88.79.53.53.79 1.16.79 1.91v26.65c0 .74-.26 1.37-.79 1.88-.51.53-1.13.79-1.88.79h-.06c-.74 0-1.38-.26-1.91-.79-.53-.51-.79-1.13-.79-1.88V15.34c0-.74.26-1.38.79-1.91a2.59 2.59 0 011.91-.79h.06zM146.33 13.41c1.25.39 1.88 1.24 1.88 2.55v.15c0 .9-.36 1.61-1.08 2.14-.74.55-1.54.68-2.4.41-1.04-.35-2.11-.53-3.22-.53-2.93 0-5.43 1.04-7.51 3.11-2.05 2.07-3.08 4.57-3.08 7.51 0 2.91 1.03 5.4 3.08 7.48 2.07 2.07 4.57 3.11 7.51 3.11 1.11 0 2.19-.17 3.22-.5.86-.27 1.66-.15 2.4.38.72.53 1.08 1.25 1.08 2.17 0 1.29-.63 2.14-1.88 2.55-1.56.49-3.18.73-4.84.73-4.42 0-8.19-1.56-11.32-4.69-3.13-3.13-4.69-6.9-4.69-11.32s1.56-8.19 4.69-11.32c3.13-3.13 6.9-4.69 11.32-4.69 1.66-.01 3.28.25 4.84.76zM155.05.62c.72 0 1.35.25 1.88.76.53.53.79 1.16.79 1.91v9.35H163c.72 0 1.35.26 1.88.79.53.53.79 1.16.79 1.91v.06c0 .74-.26 1.37-.79 1.88-.53.53-1.15.79-1.88.79h-5.28v18.27c0 .8.28 1.49.85 2.05.57.57 1.26.85 2.08.85H163c.72 0 1.35.26 1.88.79.53.53.79 1.16.79 1.91V42c0 .74-.26 1.37-.79 1.88-.53.53-1.15.79-1.88.79h-2.35c-2.31 0-4.28-.81-5.92-2.43-1.62-1.64-2.43-3.61-2.43-5.89V3.29c0-.74.26-1.38.79-1.91.53-.51 1.15-.76 1.88-.76h.08zM183.99 12.64c4.42 0 8.19 1.56 11.32 4.69 3.13 3.13 4.69 6.9 4.69 11.32s-1.56 8.19-4.69 11.32c-3.13 3.13-6.9 4.69-11.32 4.69s-8.19-1.56-11.32-4.69c-3.13-3.13-4.69-6.9-4.69-11.32s1.56-8.19 4.69-11.32c3.13-3.12 6.9-4.69 11.32-4.69zm0 5.49c-2.93 0-5.43 1.04-7.51 3.11-2.05 2.07-3.08 4.57-3.08 7.51 0 2.91 1.03 5.4 3.08 7.48 2.07 2.07 4.57 3.11 7.51 3.11s5.42-1.04 7.48-3.11c2.07-2.07 3.11-4.56 3.11-7.48 0-2.93-1.04-5.43-3.11-7.51-2.05-2.08-4.55-3.11-7.48-3.11z"
                  fill="#FFFFFF"
                ></path>
                <path
                  d="M4.53 16.53C1.69 19.37.17 22.81 0 26.75c-.01.13.1.23.22.23h14.09c.14 0 .22-.15.15-.26L7.41 14.5c-.06-.11-.21-.15-.31-.08-.91.6-1.77 1.31-2.57 2.11z"
                  fill="#FFFFFF"
                ></path>
                <path
                  d="M25.94 42.14c4.49-2.83 7.48-7.83 7.48-13.53 0-3.66-1.24-7.04-3.31-9.73.79-.48 1.91-1.21 2.3-1.62.53-.53.79-1.15.79-1.88v-.09c0-.72-.26-1.35-.79-1.88-.51-.53-1.13-.79-1.88-.79H17.43c-2.84 0-5.5.74-7.81 2.04-.1.06-.14.19-.08.29l2.49 4.32c.06.1.18.13.28.08a10.56 10.56 0 016.48-1.24c4.81.62 8.64 4.51 9.15 9.33.68 6.37-4.29 11.75-10.52 11.75-1.35 0-2.64-.26-3.82-.72a.23.23 0 00-.28.1l-2.5 4.32c-.07.12-.02.27.1.32 1.98.88 4.18 1.38 6.49 1.38h.23a7.7 7.7 0 017.65 8.57c-.39 3.51-3.05 6.26-6.54 6.74a7.699 7.699 0 01-8.52-5.55c-.32-1.14-1.3-2-2.48-2.06A2.705 2.705 0 005 55.7c1.58 5.85 7.1 10.08 13.55 9.65 6.58-.44 11.86-5.83 12.18-12.42.22-4.36-1.7-8.27-4.79-10.79z"
                  fill="#FFFFFF"
                ></path>
                <path
                  d="M11.76 37.53c-2.89-1.84-4.84-5.05-4.91-8.72 0-.11-.09-.2-.21-.2H1.67c-.12 0-.22.1-.21.22.08 5.66 3.09 10.59 7.59 13.38.11.07.25.03.32-.08l2.47-4.29c.06-.12.03-.25-.08-.31z"
                  fill="#FFFFFF"
                ></path>

                {/* Add additional paths as needed */}
              </svg>
            </div>

            <div className="flex justify-start  space-x-3 mt-4">
              {/* Social Media Icons */}
              <a href="">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="facebook"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-5 svg-inline--fa fa-facebook fa-w-16 fa-lg"
                  >
                    <path
                      fill="currentColor"
                      d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                      className=""
                    ></path>
                  </svg>
                </a>
                <a href="" className="ml-3">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="twitter"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-5 svg-inline--fa fa-twitter fa-w-16 fa-lg"
                  >
                    <path
                      fill="currentColor"
                      d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                      className=""
                    ></path>
                  </svg>
                </a>
                <a href="" className="ml-3">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="pinterest"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    className="h-5 svg-inline--fa fa-pinterest fa-w-16 fa-lg"
                  >
                    <path
                      fill="currentColor"
                      d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"
                      className=""
                    ></path>
                  </svg>
                </a>
                <a href="" className="ml-3">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="instagram"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h-5 svg-inline--fa fa-instagram fa-w-14 fa-lg"
                  >
                    <path
                      fill="currentColor"
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                      className=""
                    ></path>
                  </svg>
                </a>
                <a href="" className="ml-3">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="linkedin-in"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className=" h-5 svg-inline--fa fa-linkedin-in fa-w-14 fa-lg"
                  >
                    <path
                      fill="currentColor"
                      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                      className=""
                    ></path>
                  </svg>
              </a>
            </div>

            <h1 className="mt-4 mr-auto text-sm sm:text-base">
              © {new Date().getFullYear()} Graficto. All Rights Reserved.
            </h1>
          </div>

        </div>
      </section>
    </footer>
  );
};

export default Footer;
