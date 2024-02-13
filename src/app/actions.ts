"use server";

import db from "@/db";
import { redirect } from "next/navigation";

export async function getPosts() {
  const posts = await db.post.findMany();
  console.log(posts);
  return posts;
}

export async function createPost(
  formState: { message: string },
  formData: FormData
) {
  const title = formData.get("title");
  const description = formData.get("description");
  const slug = formData.get("slug");
  const author = formData.get("author");
  const imageUrl = formData.get("imageUrl");
  const publishedAt = formData.get("publishedAt");

  if (!title || !description || !slug || !author || !imageUrl || !publishedAt)
    return { message: "Fields missing" };

  await db.post.create({
    data: {
      title: "React Router - The Basics",
      description: "Creating a router, navigating routes, dynamic routing.",
      slug: "react-router-basics",
      author: "Aljaž Ferenc",
      imageUrl: "image url",
      publishedAt: new Date(),
      body: "React Router is a popular routing library for React applications. It allows you to build single-page applications with multiple views and URLs, without the need for a full page refresh and multiple HTTP requests.\n\nAt its core, React Router provides a set of components for defining routes in your application. These components can be used to define which component should be rendered for a given URL, as well as any additional data or parameters that should be passed to that component.\n\nOne of the key benefits of using React Router is that it allows you to build complex applications with multiple views and nested routes, while still maintaining a simple and easy-to-use API.\n\nToday we will go through the basics of the latest version of React Router (version 6.4), this will include the setup, creating a router, dynamic routing and loaders. In future posts we will discover the more advanced features React Router has to offer.\n\n## Installing React Router\n\nFirst we need to install the `react-router-dom` library by running:\n```sh\nnpm install react-router-dom\n```\n\n## Initializing a Router\n\nTo create a router we use the `createBrowserRouter` function in which we pass `createRoutesFromElements` with defined routes. Each route needs the `'path'` prop that tells React where to navigate and the `'element'` prop pointing to the component that should be rendered on that specific path. Then we provide the router to the `App` component with `RouterProvider`\n\n```javascript\n//App.jsx\n\nimport { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'\n\nconst router = createBrowserRouter(\n\tcreateRoutesFromElements(\n\t <Route path=\"/\" element={<RootLayout />}>\n\t <Route index element={<Home />} />\n\t <Route path=\"about\" element={<About />} />\n\t <Route path=\"products\" element={<Products />} />\n\t </Route> \n\t)\n);\n\n\nfunction App() {\n return (\n <RouterProvider router={router} />\n );\n}\n```\n\n## Navigating the Routes\n\nIn the `RootLayout` component we will create a navigation bar using `NavLink` components. `NavLink` is similar to the anchor tag in HTML but we can give it the `'to'` prop, which is used to define the path we want the link to navigate to, also the currently active `NavLink` automatically gets the `'active'` class that can be used for styling the current link.\n\n```javascript\n//RootLayout.jsx\nimport {NavLink} from 'react-router-dom'\n\n<nav>\n <NavLink to='/'>Home</NavLink>\n <NavLink to='about'>About</NavLink>\n <NavLink to='products'>Products</NavLink>\n</nav>\n```\n\nSince the `RootLayout` route is the parent of `Home`, `About` and `Products`, we can use the `Outlet` component inside of it, and it will render whichever child component we are currently on. This way we can keep the same navigation bar in all child routes.\n\n```javascript\n//RootLayout.jsx\nimport { NavLink, Outlet } from 'react-router-dom'\n\nexport default function RootLayout() {\n return (\n <div className='root-layout'>\n <header>\n <nav>\n <NavLink to='/'>Home</NavLink>\n <NavLink to='about'>About</NavLink>\n <NavLink to='products'>Products</NavLink>\n </nav>\n </header>\n <main>\n <Outlet/>\n </main>\n </div>\n )\n}\n```\n\n## Dynamic Route Parameters\n\nDynamic routing allows us to display the same component with different data. For example, if we click on a product from a list of products, we might want to display the same ProductDetails page with data associated with that specific product.\n\nTo set up the dynamic Route, we will use the 'path' prop with the value of ':id'. The semicolon is what makes the path dynamic.\n\n```javascript\n<Route\n path='products'\n element={<ProductsLayout>}\n>\n <Route\n path=':id'\n element={<ProductDetails />}\n loader={productsDetailsLoader}\n />\n</Route>\n```\n\nFor example, if go to `/products/iPhone`, `\"iPhone\"` becomes the `:id`.\n\nNow we can go to the `ProductDetails` page and figure out which `:id` we are currently using. We can do that by using the `useParams` hook which will return an object with information about dynamic parameters.\n\n```javascript\nimport { useParams } from 'react-router-dom'\n\nconst { id } = useParams();\n```\n\nSince we chose to use `:id` as the name of the parameter, the returned object will contain the `\"id\": \"iPhone\"` key/value pair. We can now extract the id and and use it to fetch the content relevant to that product.\n\n## Loaders and Throwing Errors\n\nLet's take a look at two more props that are available on a `Route` component: `loader` and `errorElement`.\n\nLoaders are functions that are executed just before the component is rendered. A common use case is fetching data before displaying it in the component. The `errorElement` prop defines a component that will be rendered in case the loader function throws an error. Errors will bubble up to the parent Route component so we could give it the `errorElement` prop and it would catch any error that is thrown in any of its child components.\n\n```javascript\n<Route\n index\n element={<Products />}\n loader={productsLoader}\n errorElement={<ProductsError />}\n/>\n```\n\nLet's create a loader function that fetches some data and throws an error if it fails.\n\n```javascript\nexport const productsLoader = async () => {\n const res = await fetch(\"http://www.cool-products.com/products.\")\n \n if(!res.ok){\n throw Error(\"Could not fetch the products\")\n }\n \n return res.json()\n}\n```\n\nIn order to use the data returned from the loader, `react-router-dom` provides the `useLoaderData` hook.\n\n```javascript\nimport { useLoaderData, Link } from \"react-router-dom\"\n\n//use returned data in component\nexport default function Products(){\n\tconst products = useLoaderData()\n\t\n\t//rest of component...\n}\n```\n\n## Conclusion\n\nWith its simple and intuitive API, as well as its advanced features for code splitting, lazy loading, and server-side rendering, which we will cover in future posts, React Router makes it easy to build scalable and performant applications that can grow and evolve over time. So if you're working on a React project and need to handle routing logic, be sure to give React Router a try and see how it can help streamline your development process.",
    },
  });
  
  return {
    message: "Post created",
  };
  redirect("/posts");
}
