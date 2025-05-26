import React from "react";

export default function loading() {
  return (
    <div className="max-w-6xl mx-auto font-sans animate-pulse">
      <main className="p-4">
        {/* Title Skeleton */}
        <div className="mb-4">
          <div className="h-8 w-2/3 bg-gray-200 rounded mb-2" />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-5 w-16 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-16 bg-gray-200 rounded" />
              <div className="h-8 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Photo Gallery Skeleton */}
        <div className="grid grid-cols-4 grid-rows-2 h-96 gap-2 mb-6">
          <div className="col-span-2 row-span-2 bg-gray-200 rounded-l-lg" />
          <div className="col-span-2 row-span-1 bg-gray-200 rounded-tr-lg" />
          <div className="col-span-1 row-span-1 bg-gray-200" />
          <div className="col-span-1 row-span-1 bg-gray-200 rounded-br-lg" />
        </div>

        <div className="flex flex-wrap">
          {/* Main Content Skeleton */}
          <div className="w-full lg:w-8/12 pr-0 lg:pr-6">
            {/* Landlord Info Skeleton */}
            <div className="flex items-start mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4" />
              <div>
                <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                <div className="flex items-center space-x-4">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="mb-6">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-full bg-gray-200 rounded mb-2" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
            </div>

            {/* Equipment Skeleton */}
            <div className="mb-6">
              <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Skeleton */}
            <div className="mt-6">
              <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="mb-4 rounded-xl border border-gray-200 bg-gray-100 p-5 shadow-sm"
                  >
                    <div className="h-5 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Location Skeleton */}
            <div className="mb-6 mt-6">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
              <div className="h-64 bg-gray-200 rounded-lg" />
            </div>

            {/* Reviews Skeleton */}
            <div className="mb-6">
              <div className="h-6 w-64 bg-gray-200 rounded mb-4" />
              <div className="flex items-center mb-4 space-x-2">
                <div className="h-4 w-8 bg-gray-200 rounded" />
                <div className="h-4 w-12 bg-gray-200 rounded" />
                <div className="h-4 w-8 bg-gray-200 rounded" />
                <div className="h-4 w-12 bg-gray-200 rounded" />
              </div>
              <div className="flex gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-1/2">
                    <div className="flex border border-gray-200 p-4 rounded-lg shadow-sm ml-1">
                      <div className="mr-3 h-10 w-10 bg-gray-200 rounded-full" />
                      <div className="flex flex-col flex-1">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-1" />
                        <div className="h-3 w-16 bg-gray-200 rounded mb-1" />
                        <div className="h-4 w-full bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reserve Card Skeleton */}
          <div className="w-full lg:w-4/12 mt-6 lg:mt-0">
            <div className="border border-gray-200 rounded-lg p-6 shadow-md sticky top-6">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
              <div className="h-12 w-full bg-gray-200 rounded mb-4" />
              <div className="h-10 w-full bg-gray-200 rounded mb-4" />
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
