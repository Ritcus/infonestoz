import { PortableText, PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

// Create an image URL builder instance
const builder = imageUrlBuilder(client);

// Function to build image URL from Sanity reference
function urlFor(source: { _ref: string }) {
  return builder.image(source);
}

// Define the types for PortableText content (Optional but recommended)
interface PortableTextContent {
  _type: string;
  [key: string]: any;
}

// Generic function to render PortableText content (including images)
export const renderPortableText = (content: PortableTextContent[]) => {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 5,
              margin: 10,
            }}
          >
            <img
              src={urlFor(value).width(800).height(400).url()} // Set both width and height to 300 for square size
              alt={value.alt || " "}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover", // Maintain the aspect ratio
                borderRadius: "8px", // Optional: Add rounded corners
              }}
            />
          </div>
        );
      },
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-3xl m-10 font-bold text-center">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl m-10 font-bold text-center">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-3xl m-10 font-bold text-center">{children}</h3>
      ),
      h4: ({ children }) => (
        <h3 className="text-3xl m-10 font-bold text-center">{children}</h3>
      ),
      normal: ({ children }) => (
        <p className="text-base font-medium leading-relaxed my-3 ">
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-5 my-3">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-5 my-3">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-2">{children}</li>,
      number: ({ children }) => <li className="mb-2">{children}</li>,
    },
  };

  return <PortableText value={content} components={components} />;
};
