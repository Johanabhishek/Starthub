"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase/client"

const industries = [
  { label: "SaaS", value: "saas" },
  { label: "Fintech", value: "fintech" },
  { label: "Health Tech", value: "healthtech" },
  { label: "E-commerce", value: "ecommerce" },
  { label: "EdTech", value: "edtech" },
  { label: "AI/ML", value: "ai-ml" },
  { label: "Clean Tech", value: "cleantech" },
  { label: "Hardware", value: "hardware" },
  { label: "Marketplace", value: "marketplace" },
  { label: "Consumer", value: "consumer" },
]

const stages = [
  { label: "Idea", value: "idea" },
  { label: "Pre-seed", value: "pre-seed" },
  { label: "Seed", value: "seed" },
  { label: "Series A", value: "series-a" },
  { label: "Series B", value: "series-b" },
  { label: "Series C+", value: "series-c-plus" },
]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Startup name must be at least 2 characters.",
  }),
  tagline: z.string().min(5, {
    message: "Tagline must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  industry: z.string({
    required_error: "Please select an industry.",
  }),
  stage: z.string({
    required_error: "Please select a stage.",
  }),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  foundedYear: z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid year (YYYY).",
  }),
  teamSize: z.string().regex(/^\d+$/, {
    message: "Please enter a valid number.",
  }),
})

export default function CreateStartupPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tagline: "",
      description: "",
      website: "",
      foundedYear: new Date().getFullYear().toString(),
      teamSize: "1",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a startup profile.",
        variant: "destructive",
      })
      router.push("/auth/signin")
      return
    }

    setIsSubmitting(true)

    try {
      // Insert startup into Supabase
      const { data, error } = await supabase
        .from("startups")
        .insert({
          founder_id: user.id,
          name: values.name,
          tagline: values.tagline,
          description: values.description,
          industry: values.industry,
          stage: values.stage,
          website: values.website || null,
          founded_year: Number.parseInt(values.foundedYear),
          team_size: Number.parseInt(values.teamSize),
        })
        .select()

      if (error) {
        throw error
      }

      toast({
        title: "Startup profile created!",
        description: "Your startup profile has been created successfully.",
      })

      // Redirect to startup dashboard
      router.push("/startup/dashboard")
    } catch (error: any) {
      toast({
        title: "Error creating startup",
        description: error.message || "An error occurred while creating your startup profile.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Create Your Startup Profile</h1>
          <p className="text-gray-400 text-center mb-8">
            Tell us about your startup to get matched with investors and resources
          </p>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Startup Information</CardTitle>
              <CardDescription>Fill out the details below to create your startup profile</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. TechNova" {...field} className="bg-gray-800 border-gray-700" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Revolutionizing the way people work"
                            {...field}
                            className="bg-gray-800 border-gray-700"
                          />
                        </FormControl>
                        <FormDescription>A short, catchy phrase that describes your startup</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe what your startup does, the problem you're solving, and your unique value proposition..."
                            {...field}
                            className="bg-gray-800 border-gray-700 min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Industry</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "justify-between bg-gray-800 border-gray-700",
                                    !field.value && "text-gray-400",
                                  )}
                                >
                                  {field.value
                                    ? industries.find((industry) => industry.value === field.value)?.label
                                    : "Select industry"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700">
                              <Command className="bg-gray-800">
                                <CommandInput placeholder="Search industry..." />
                                <CommandList>
                                  <CommandEmpty>No industry found.</CommandEmpty>
                                  <CommandGroup>
                                    {industries.map((industry) => (
                                      <CommandItem
                                        key={industry.value}
                                        value={industry.value}
                                        onSelect={() => {
                                          form.setValue("industry", industry.value)
                                        }}
                                        className={cn(
                                          "cursor-pointer",
                                          industry.value === field.value && "bg-gray-700",
                                        )}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            industry.value === field.value ? "opacity-100" : "opacity-0",
                                          )}
                                        />
                                        {industry.label}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stage"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Stage</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "justify-between bg-gray-800 border-gray-700",
                                    !field.value && "text-gray-400",
                                  )}
                                >
                                  {field.value
                                    ? stages.find((stage) => stage.value === field.value)?.label
                                    : "Select stage"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700">
                              <Command className="bg-gray-800">
                                <CommandInput placeholder="Search stage..." />
                                <CommandList>
                                  <CommandEmpty>No stage found.</CommandEmpty>
                                  <CommandGroup>
                                    {stages.map((stage) => (
                                      <CommandItem
                                        key={stage.value}
                                        value={stage.value}
                                        onSelect={() => {
                                          form.setValue("stage", stage.value)
                                        }}
                                        className={cn("cursor-pointer", stage.value === field.value && "bg-gray-700")}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            stage.value === field.value ? "opacity-100" : "opacity-0",
                                          )}
                                        />
                                        {stage.label}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://your-startup.com"
                              {...field}
                              className="bg-gray-800 border-gray-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="foundedYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Founded Year</FormLabel>
                          <FormControl>
                            <Input placeholder="2023" {...field} className="bg-gray-800 border-gray-700" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="teamSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Size</FormLabel>
                        <FormControl>
                          <Input placeholder="1" {...field} className="bg-gray-800 border-gray-700" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-4">
                    <Link href="/">
                      <Button variant="outline" className="border-gray-700">
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating..." : "Create Profile"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-gray-800 pt-6">
              <p className="text-sm text-gray-400">
                Already have a startup profile?{" "}
                <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300">
                  Log in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
