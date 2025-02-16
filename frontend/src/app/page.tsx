"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useState,useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result); // Store the fetched data
      console.log(data)
    } catch (err) {
      setError("Failed to fetch data"); // Handle error
    } finally {
      setLoading(false); // Turn off loading state
    }
  };

  // Function to handle the text change event
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value); // Update the text state with the new value
  };

  // Handle file input change
  const onHandleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    // Check if a file is selected
    if (!selectedFile) {
      setError("Please select a file.");
      setFile(null);
      return;
    }
  
    // If all checks pass, set the file
    setFile(selectedFile);
    setError(null);  // Clear any previous errors
    console.log(file)
  };

  // UseEffect to log text state changes
  useEffect(() => {
    console.log("Text changed:", text);
  }, [text]); // This will run every time the `text` state changes

  // UseEffect to log file state changes
  useEffect(() => {
    console.log("File selected:", file);
  }, [file]); // This will run every time the `file` state changes

  return (
    <div>
      <main className="min-h-screen flex flex-col justify-center items-center">
        <div className=" flex-col space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enter Classes</CardTitle>
              <CardDescription>Seperate course codes by commas (CS1234, MATH1234)</CardDescription>
            </CardHeader>
            <CardContent>
            <Textarea onChange={onTextChange} maxLength={300} placeholder="Type your message here." className="h-50[px] max-h-[200px]"/>
            </CardContent>
            <CardFooter className="flex justify-between items-end space-x-2">
              <div>
                <Label htmlFor="picture">Upload png, jpeg, and PDF.</Label>
                <Input onChange={onHandleFileChange} id="picture" type="file"/>
              </div>
              <Button onClick={handleClick} disabled={loading}>
                {loading ? "Sooting..." : "Soot Schedule"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
