import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <main className="min-h-screen flex flex-col justify-center items-center">
        <div className=" flex-col space-y-4">
            <div>
              <Label>Enter the classes you want to take or upload the image of your schedule.</Label>
              <Textarea maxLength={300} placeholder="Type your message here." className="h-50[px] max-h-[200px]"/>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <Label htmlFor="picture">Upload png, jpeg, and PDF.</Label>
                <Input id="picture" type="file" />
              </div>
              <Button>Soot Up!</Button>
            </div>
        </div>
      </main>
    </div>
  )
}
