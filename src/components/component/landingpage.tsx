import Link from "next/link"
import { Input } from "@/components/ui/input"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { StarsIcon } from "lucide-react"

export default function LandingPage() {
  const sections = [
    {
      id: 1,
      title: "Acme Prism Tee",
      description: "A perfect blend of style and comfort for the modern individual.",
      imageUrl: "/placeholder.svg",
      linkText: "Shop Now",
      linkHref: "#",
    },
    {
      id: 2,
      title: "Featured Products",
      description: "Discover our latest collection of stylish and high-quality products.",
      products: [
        {
          id: 1,
          name: "Classic Leather Shoes",
          description: "Elegant and comfortable",
          price: "$59.99",
          imageUrl: "/placeholder.svg",
        },
        {
          id: 2,
          name: "Designer Handbag",
          description: "Fashion statement",
          price: "$89.99",
          imageUrl: "/placeholder.svg",
        },
        {
          id: 3,
          name: "Wireless Earbuds",
          description: "Crystal clear audio",
          price: "$69.99",
          imageUrl: "/placeholder.svg",
        },
        {
          id: 4,
          name: "Vintage Pocket Watch",
          description: "Antique charm",
          price: "$79.99",
          imageUrl: "/placeholder.svg",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="flex items-center justify-between px-4 lg:px-6 h-14 lg:h-20 border-b bg-background">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <StarsIcon className="h-6 w-6" />
          <span className="font-semibold text-lg">Pulse Star</span>
        </Link>
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 h-9 lg:h-10 rounded-md bg-muted focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Shop</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">About</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Contact</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="flex-2">
        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </main>
      <footer className="flex justify-center items-center bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <FooterLinks/>
        </div>
      </footer>
    </div>
  );
}

function Section({ section }) {
  if (section.products) {
    return (
      <section className="flex justify-center items-center w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{section.title}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {section.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {section.products.map((product) => (
              <div key={product.id} className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                  <span className="sr-only">View</span>
                </Link>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <h4 className="text-lg font-semibold md:text-xl">{product.price}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-center items-center w-full pt-12 md:pt-24 lg:pt-32">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-16">
        <img
          src={section.imageUrl}
          width={800}
          height={800}
          alt={section.title}
          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
        />
        <div className="flex flex-col items-start justify-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{section.title}</h1>
          <p className="text-muted-foreground md:text-xl">
            {section.description}
          </p>
          <Link
            href={section.linkHref}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            {section.linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}

function FooterLinks() {
  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Our Team", "Careers", "News"],
    },
    {
      title: "Products",
      links: ["Men", "Women", "Kids", "Accessories"],
    },
    {
      title: "Resources",
      links: ["Blog", "Community", "Support", "FAQs"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
    {
      title: "Contact",
      links: ["Support", "Sales", "Press", "Partnerships"],
    },
  ];

  return (
    <>
      {footerLinks.map((section, index) => (
        <div key={index} className="grid gap-1">
          <h3 className="font-semibold">{section.title}</h3>
          {section.links.map((link, i) => (
            <Link key={i} href="#" prefetch={false}>
              {link}
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
