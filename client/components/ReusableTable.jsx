'use client';

import { useState, useMemo } from 'react';
import { Input, Button } from "@material-tailwind/react";

export default function ReusableTable({
  title,
  description,
  headers,
  data,
  imageKeys = [],
  itemsPerPage = 10,
}) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);;

  const filteredData = useMemo(() => {
    const term = search.toLowerCase();
    return data.filter(row =>
      headers.some(({ key }) => {
        const value = row[key];
        return value?.toString().toLowerCase().includes(term);
      })
    );
  }, [search, data, headers]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="mb-4 max-w-sm ">
        <Input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse  ">
          <thead>
            <tr className="bg-gray-200">
              {headers.map((h) => (
                <th
                  key={h.key}
                  className="border px-4 py-3 text-center font-semibold text-gray-700"
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="text-center py-4 text-gray-500">
                  No matching results.
                </td>
              </tr>
            ) : (
              currentData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100 transition-colors`}
                >
                  {headers.map(({ key }) => (
                    <td key={key} className="border px-4 py-3 text-center align-middle font-family: var(--font-sans) ">
                      {imageKeys.includes(key) && row[key] ? (
                        <div className="flex justify-center items-center w-full ">
                          <img
                            src={row[key]}
                            alt={`${key} preview`}
                            className="h-50 w-auto object-contain rounded shadow"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-800" >{row[key]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <Button
            size="sm"
            variant="outlined"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => {
                const isActive = currentPage === i + 1;

                return (
                  <Button
                    key={i}
                    size="sm"
                    onClick={() => goToPage(i + 1)}
                    className={`min-w-[36px] px-3 py-1 text-sm rounded ${
                      isActive
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </Button>
                );
              })}
            </div>

          <Button
            size="sm"
            variant="outlined"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
