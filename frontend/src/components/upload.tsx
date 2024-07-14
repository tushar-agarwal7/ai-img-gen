'use client'
import { Chivo } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { saveAs } from 'file-saver';

// Import and configure the Chivo font
const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export function Upload() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const downloadImage = async () => {
    await saveAs(image, 'image.jpg');
  }

  return (
    <div className={`flex flex-col items-center justify-center bg-[#1f2937] dark:bg-[#1f2937] text-[#f3f4f6] ${chivo.className}`}>
      <div className="max-w-4xl w-full px-4 py-16 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Generate {' '}
            <span className="custom">AI Images</span> 
          </h1>
          <p className="mt-4 text-lg md:text-xl/relaxed text-gray-400">
            Enter a prompt and let our AI generate a unique image for you.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Input
            type="text"
            placeholder="Enter a prompt to generate an image"
            className="flex-1 rounded-md border border-input bg-[#374151] dark:bg-[#374151] px-4 py-2 text-[#f3f4f6] dark:text-[#f3f4f6] shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            type="button"
            className="ml-4 btn inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={async () => {
              setLoading(true); // Set loading to true when the request starts
              try {
                const res = await fetch('https://backend-hono.tushar-agarwal7373.workers.dev/?prompt=' + prompt);
                const blob = await res.blob();
                setImage(URL.createObjectURL(blob));
              } catch (error) {
                console.error(error);
              } finally {
                setLoading(false); // Set loading to false when the request ends
              }
            }}
          >
            {loading ? (
              <div className="loader"></div> // Add loader component or spinner
            ) : (
              "Generate"
            )}
          </Button>
        </div>
        <div className="bg-[#374151] dark:bg-[#374151] rounded-md shadow-lg overflow-hidden mt-8">
          <img
            src={image ? image : "/robo.jpg"}
            alt="Generated Image"
            className="w-full h-1/3 object-cover"
          />
        </div>
        <Button
          type="button"
          className="ml-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          onClick={downloadImage} // Invoke the function here
        >
          <DownloadIcon /> Download Image
        </Button>
        <footer className="mt-8 w-full py-4 text-center rounded-md shadow-lg">
          <div className="text-sm text-gray-400 dark:text-gray-500 flex items-center justify-center space-x-2">
            <span>Made by</span>
            <a href="https://github.com/tushar-agarwal7" target="_blank" rel="noopener noreferrer" className="custom p-2  hover:underline">
              Tushar Agarwal
            </a>
            <GitHubIcon />
          </div>
        </footer>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
      <path d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}


function GitHubIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
    <path d="M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
  )
}
