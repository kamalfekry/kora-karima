"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

// Validation schema
const formSchema = z.object({
  researcher: z.string().min(1, "يجب اختيار الباحث"),
  coordinator: z.string().min(1, "يجب اختيار المنسق"),
  visitDate: z.date({
    required_error: "يجب اختيار تاريخ الزيارة",
  }),
})

type FormData = z.infer<typeof formSchema>

const researchers = [
  { value: "1", label: "احمد محمد" },
  { value: "2", label: "محمد علي" },
  { value: "3", label: "فاطمة احمد" },
]

const coordinators = [
  { value: "1", label: "سارة محمد" },
  { value: "2", label: "عمر خالد" },
  { value: "3", label: "ليلى احمد" },
]

export default function LoginForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    // Navigate to the beneficiary form page
    router.push("/beneficiary")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6" dir="rtl">
      <div className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-end">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-27%20at%2015.10.01_b415e626.jpg-fhjCkTNMIyelHhKt3JqF86HwA6P7eS.jpeg"
            alt="Logo"
            width={80}
            height={80}
            className="h-20 w-20 object-contain"
          />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold">مبادره</h1>
          <p className="mt-2 text-gray-600">ادخال بيانات</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="researcher">اسم الباحث</Label>
            <Select onValueChange={(value) => setValue("researcher", value)} required>
              <SelectTrigger id="researcher" className="w-full">
                <SelectValue placeholder="اختر الباحث" />
              </SelectTrigger>
              <SelectContent>
                {researchers.map((researcher) => (
                  <SelectItem key={researcher.value} value={researcher.value}>
                    {researcher.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.researcher && <p className="text-sm text-red-500">{errors.researcher.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coordinator">اسم المنسق الميداني</Label>
            <Select onValueChange={(value) => setValue("coordinator", value)} required>
              <SelectTrigger id="coordinator" className="w-full">
                <SelectValue placeholder="اختر المنسق" />
              </SelectTrigger>
              <SelectContent>
                {coordinators.map((coordinator) => (
                  <SelectItem key={coordinator.value} value={coordinator.value}>
                    {coordinator.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.coordinator && <p className="text-sm text-red-500">{errors.coordinator.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitDate">تاريخ الزيارة</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-right font-normal", !date && "text-muted-foreground")}
                >
                  <Calendar className="ml-2 h-4 w-4" />
                  {date ? date.toLocaleDateString("ar-EG") : "اختر التاريخ"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date)
                    if (date) {
                      setValue("visitDate", date)
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.visitDate && <p className="text-sm text-red-500">{errors.visitDate.message}</p>}
          </div>

          <Button type="submit" className="w-full">
            اضافه حاله
          </Button>
        </form>
      </div>
    </div>
  )
}

