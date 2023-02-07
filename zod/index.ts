import { z, ZodError } from "zod";

try {
  const QueryStringRequest = z.object({
    page: z.coerce.number().int().min(1).max(25).default(1),
    search: z.optional(z.string().max(200).transform((val) => val.trim().toLowerCase().replace(/\s{2,}/g, " "))),
    tags: z.optional(z.string().max(100)).transform((val) => (val || "").replace(/\s/g, "").toLowerCase().split(",").filter((val) => val.length)),
    status: z.optional(z.enum(["ACTIVE", "INACTIVE"])),
    active: z.string().default("true").refine((val) => val === "true" || val === "false", { message: "Invalid boolean value" }).transform((val) => val === "true"),
  });

  QueryStringRequest.parse({ page: "25", search: "Lorem ipsum dolor sit amet" });
  QueryStringRequest.parse({ tags: "A,B,C", status: "ACTIVE", active: "false" });

  const UpdateUserRequest = z.object({
    id: z.string().uuid(),
    name: z.string().min(3).max(200).transform((val) => val.trim().replace(/\s{2,}/g, " ")),
    countryId: z.string().uuid().nullable(),
    email: z.string().regex(/^[a-z]{3,}@mycompany.com$/),
    permissions: z.array(z.enum(["VIEW", "EDIT", "CREATE"])).nonempty(),
    job: z.object({
      description: z.string().max(100),
    }).nullable(),
  });

  const updateUserRequest: z.infer<typeof UpdateUserRequest> = {
    id: "88ce2bbb-1097-43ff-96c2-d1928f2cd573",
    name: "John",
    countryId: null,
    email: "john@mycompany.com",
    permissions: ["VIEW"],
    job: null,
  };

  UpdateUserRequest.parse(updateUserRequest);

  const CreateUserRequest = z.object({
    email: z.string().max(100).email().refine(async (val) => new Promise((res) => res(val !== "john@mycompany.com")), { message: "Email already taken" }),
    password: z.string().min(8).max(32).regex(/^[A-z0-9]*$/),
  });

  await CreateUserRequest.parseAsync({ email: "paul@mycompany.com", password: "abcd1234" });
} catch (err) {
  if (err instanceof ZodError) {
    console.log(err.errors);
  }
}
