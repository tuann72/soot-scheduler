"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useState,useEffect } from "react";

import { filterCoursesByCodes } from "@/lib/filter"

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const [startTime, setStartTime] = useState('9:00AM');
  const [endTime, setEndTime] = useState('2:00PM');
  const [includeGenEd, setIncludeGenEd] = useState('true');

  // SVGs as imports or images
  const svgs = [
    "soot-1.svg",
    "soot-2.svg",
    "soot-3.svg",
    "soot-4.svg"
  ];

  const [positions, setPositions] = useState<any[]>([]);

  useEffect(() => {
    const generateRandomPositions = () => {
      const randomPos: any[] = [];

      svgs.forEach((_, svgIndex) => {
        for (let i = 0; i < 5; i++) {
          const top = Math.random() * 80 + "%"; // Random top position (80% of the screen)
          const left = Math.random() * 80 + "%"; // Random left position (80% of the screen)
          const rotate = Math.random() * 45 + "deg"; // Random rotation angle

          // Store the positions
          randomPos.push({
            svgIndex,
            top,
            left,
            rotate,
          });
        }
      });

      setPositions(randomPos);
    };

    generateRandomPositions(); // Generate positions on component mount
  }, []);

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
      if (data) {
        filterCoursesByCodes(data,text);
      }
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

  useEffect(() => {
    console.log('Start Time changed:', startTime);
  }, [startTime]);

  useEffect(() => {
    console.log('End Time changed:', endTime);
  }, [endTime]);

  useEffect(() => {
    console.log('Include GenEd changed:', includeGenEd);
  }, [includeGenEd]);

  return (
    <div>
      {positions.map((pos, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: pos.top,
            left: pos.left,
            transform: `rotate(${pos.rotate}) scale(${pos.scale})`,
            zIndex: -1, // Make sure they stay in the background
          }}
        >
          <Image
            src={svgs[pos.svgIndex]} // Use the current SVG from the array
            alt={`SVG ${pos.svgIndex + 1}`}
            width={100} // Default size, you can adjust
            height={100} // Default size, you can adjust
            className="object-contain"
          />
        </div>
      ))}

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
            <CardFooter className="flex-col space-y-4">
              <div className="flex justify-between items-end space-x-2">
                <div>
                  <Label htmlFor="picture">Upload png, jpeg, and PDF.</Label>
                  <Input onChange={onHandleFileChange} id="picture" type="file"/>
                </div>
                <Button onClick={handleClick} disabled={loading}>
                  {loading ? "Sooting..." : "Soot Schedule"}
                </Button>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Advanced Options</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Parameters</h4>
                      <p className="text-sm text-muted-foreground">
                        Set additional filters.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      {/* Start Time Input */}
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                          id="startTime"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)} // Update state on input change
                          className="col-span-2 h-8"
                        />
                      </div>
                      
                      {/* End Time Input */}
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input
                          id="endTime"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)} // Update state on input change
                          className="col-span-2 h-8"
                        />
                      </div>

                      {/* Include GenEd Radio Group */}
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="useGenEd">Include General Ed.</Label>
                        <RadioGroup value={includeGenEd} onValueChange={setIncludeGenEd}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="r1" />
                            <Label htmlFor="r1">true</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="r2" />
                            <Label htmlFor="r2">false</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
