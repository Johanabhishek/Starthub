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
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase/client"

const investorTypes = [
  { label: "Angel Investor", value: "angel" },
  { label: "Venture Capital", value: "vc" },
  { label: "Corporate Investor", value: "corporate" },
  { label: "Family Office", value: "family-office" },
  { label: "Accelerator/Incubator", value: "accelerator" },
]

const investmentStages = [
  { label: "Pre-seed", value: "pre-seed" },
  { label: "Seed", value: "seed" },
  { label: "Series A", value: "series-a" },
  { label: "Series B", value: "series-b" },
  { label: "Series C+", value: "series-c-plus" },
  { label: "Growth", value: "growth" },
]

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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  investorType: z.string({
    required_error: "Please select an investor type.",
  }),
  bio: z.string().min(20, {
    message: "Bio must be at least 20 characters.",
  }),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  linkedIn: z
    .string()
    .url({
      message: "Please enter a valid LinkedIn URL.",
    })
    .optional()
    .or(z.literal("")),
  investmentStages: z.array(z.string()).min(1, {
    message: "Please select at least one investment stage.",
  }),
  preferredIndustries: z.array(z.string()).min(1, {
    message: "Please select at least one industry.",
  }),
  typicalCheckSize: z.string().min(1, {
    message: "Please enter your typical check size.",
  }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
})

export default function InvestorRegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      bio: "",
      website: "",
      linkedIn: "",
      investmentStages: [],
      preferredIndustries: [],
      typicalCheckSize: "",
      termsAccepted: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create an investor profile.",
        variant: "destructive",
      })
      router.push("/auth/signin")
      return
    }

    setIsSubmitting(true)

    try {
      // Insert investor profile into Supabase
      const { error: investorError } = await supabase.from("investors").insert({
        id: user.id,
        company: values.company,
        investor_type: values.investorType,
        bio: values.bio,
        website: values.website || null,
        linkedin: values.linkedIn || null,
        typical_check_size: values.typicalCheckSize,
      })

      if (investorError) {
        throw investorError
      }

      // Insert investment stages
      const stagesData = values.investmentStages.map((stage) => ({
        investor_id: user.id,
        stage: stage,
      }))

      const { error: stagesError } = await supabase.from("investment_stages").insert(stagesData)

      if (stagesError) {
        throw stagesError
      }

      // Insert preferred industries
      const industriesData = values.preferredIndustries.map((industry) => ({
        investor_id: user.id,
        industry: industry,
      }))

      const { error: industriesError } = await supabase.from("preferred_industries").insert(industriesData)

      if (industriesError) {
        throw industriesError
      }

      toast({
        title: "Investor profile created!",
        description: "Your investor profile has been created successfully.",
      })

      // Redirect to investor dashboard
      router.push("/investor/dashboard")
    } catch (error: any) {
      toast({
        title: "Error creating investor profile",
        description: error.message || "An error occurred while creating your investor profile.",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Join as an Investor</h1>
          <p className="text-gray-400 text-center mb-8">
            Create your investor profile to discover promising startups and investment opportunities
          </p>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Investor Information</CardTitle>
              <CardDescription>Fill out the details below to create your investor profile</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} className="bg-gray-800 border-gray-700" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} className="bg-gray-800 border-gray-700" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company/Firm</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Ventures" {...field} className="bg-gray-800 border-gray-700" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="investorType"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Investor Type</FormLabel>
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
                                    ? investorTypes.find((type) => type.value === field.value)?.label
                                    : "Select investor type"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700">
                              <Command className="bg-gray-800">
                                <CommandInput placeholder="Search investor type..." />
                                <CommandList>
                                  <CommandEmpty>No type found.</CommandEmpty>
                                  <CommandGroup>
                                    {investorTypes.map((type) => (
                                      <CommandItem
                                        key={type.value}
                                        value={type.value}
                                        onSelect={() => {
                                          form.setValue("investorType", type.value)
                                        }}
                                        className={cn("cursor-pointer", type.value === field.value && "bg-gray-700")}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            type.value === field.value ? "opacity-100" : "opacity-0",
                                          )}
                                        />
                                        {type.label}
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

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself, your investment philosophy, and what you look for in startups..."
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
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com"
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
                      name="linkedIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://linkedin.com/in/username"
                              {...field}
                              className="bg-gray-800 border-gray-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="investmentStages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Stages</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                          {investmentStages.map((stage) => (
                            <FormField
                              key={stage.value}
                              control={form.control}
                              name="investmentStages"
                              render={({ field: fieldInner }) => (
                                <FormItem key={stage.value} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={fieldInner.value.includes(stage.value)}
                                      onCheckedChange={(checked) => {
                                        const updatedValue = checked
                                          ? [...fieldInner.value, stage.value]
                                          : fieldInner.value.filter((value) => value !== stage.value)
                                        fieldInner.onChange(updatedValue)
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{stage.label}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredIndustries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Industries</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                          {industries.map((industry) => (
                            <FormField
                              key={industry.value}
                              control={form.control}
                              name="preferredIndustries"
                              render={({ field: fieldInner }) => (
                                <FormItem
                                  key={industry.value}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={fieldInner.value.includes(industry.value)}
                                      onCheckedChange={(checked) => {
                                        const updatedValue = checked
                                          ? [...fieldInner.value, industry.value]
                                          : fieldInner.value.filter((value) => value !== industry.value)
                                        fieldInner.onChange(updatedValue)
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{industry.label}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="typicalCheckSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Typical Check Size</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. $25,000 - $100,000"
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
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              if (checked === true) field.onChange(true)
                              if (checked === false) field.onChange(false)
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I accept the{" "}
                            <Link href="#" className="text-purple-400 hover:text-purple-300">
                              terms and conditions
                            </Link>
                          </FormLabel>
                          <FormDescription>You agree to our Terms of Service and Privacy Policy.</FormDescription>
                          <FormMessage />
                        </div>
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
                      {isSubmitting ? "Registering..." : "Create Profile"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-gray-800 pt-6">
              <p className="text-sm text-gray-400">
                Already have an investor profile?{" "}
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
