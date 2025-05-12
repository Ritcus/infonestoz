"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

export function InstallButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button - always visible */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] bg-purple-900 hover:bg-purple-800 shadow-lg rounded-full h-14 w-14 p-0 flex items-center justify-center"
        aria-label="Install app"
      >
        <Download className="h-6 w-6" />
      </Button>

      {/* Dialog for installation instructions */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Install InfoNestOz</DialogTitle>
            <DialogDescription>
              Add InfoNest to your home screen for quick access, just like a
              native app.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="ios" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ios">iOS</TabsTrigger>
              <TabsTrigger value="android">Android</TabsTrigger>
            </TabsList>

            <TabsContent value="ios" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h3 className="font-medium">On Safari:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Tap the{" "}
                    <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100">
                      Share{" "}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>{" "}
                    button at the bottom of the screen
                  </li>
                  <li>
                    Scroll down and tap{" "}
                    <span className="font-medium">Add to Home Screen</span>
                  </li>
                  <li>
                    Tap <span className="font-medium">Add</span> in the
                    top-right corner
                  </li>
                </ol>

                <div className="rounded-md bg-purple-50 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-purple-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 text-sm text-purple-900">
                      <p>
                        You&apos;ll now have the InfoNest icon on your home
                        screen for easy access.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="android" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h3 className="font-medium">On Chrome:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Tap the{" "}
                    <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100">
                      Menu ⋮
                    </span>{" "}
                    button in the top-right
                  </li>
                  <li>
                    Tap <span className="font-medium">Add to Home screen</span>
                  </li>
                  <li>
                    Tap <span className="font-medium">Add</span> when prompted
                  </li>
                </ol>

                <div className="rounded-md bg-purple-50 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-purple-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 text-sm text-purple-900">
                      <p>
                        You&apos;ll now have the InfoNest icon on your home
                        screen for easy access.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
