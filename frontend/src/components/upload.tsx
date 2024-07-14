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
    await saveAs(image, 'image.jpg')
  }

  return (
    <div className={`flex flex-col items-center justify-center  bg-[#1f2937] dark:bg-[#1f2937] text-[#f3f4f6] ${chivo.className}`}>
      <div className="max-w-4xl w-full px-4 py-16 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Generate AI Images
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
            onChange={(e) => {
              setPrompt(e.target.value)
            }}
          />
          <Button
            type="button"
            className="ml-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
         <DownloadIcon/> Download Image
        </Button>
      </div>
    </div>
  );
}


function DownloadIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
    <path d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
  )
}