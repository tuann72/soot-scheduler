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



export default function Home() {
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
            <Textarea maxLength={300} placeholder="Type your message here." className="h-50[px] max-h-[200px]"/>
            </CardContent>
            <CardFooter className="flex justify-between items-end">
              <div>
                <Label htmlFor="picture">Upload png, jpeg, and PDF.</Label>
                <Input id="picture" type="file" />
              </div>
              <Button>Soot Up!</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
