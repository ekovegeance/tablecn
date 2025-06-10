"use client"

import { Table } from "@tanstack/react-table"
import { DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DataTableDownloadRowsProps<TData> {
    table: Table<TData>
    fileName?: string // Nama file (opsional)
}

// Fungsi helper untuk mengubah array of object menjadi string CSV
function convertToCSV<TData>(data: TData[]): string {
    if (data.length === 0) {
        return ""
    }

    const headers = Object.keys(data[0] as object)
    const rows = data.map(obj =>
        headers.map(header => JSON.stringify((obj as any)[header])).join(',')
    )

    return [headers.join(','), ...rows].join('\n')
}

export default function DataTableDownloadRows<TData>({table, fileName = "data"}: DataTableDownloadRowsProps<TData>) {

    const handleDownload = () => {
        const selectedRows = table.getSelectedRowModel().flatRows
        const dataToDownload = selectedRows.map(row => row.original)
        const csvData = convertToCSV(dataToDownload)

        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-s8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.setAttribute('href', url)
        link.setAttribute('download', `${fileName}_${new Date().toISOString()}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Button
            variant="secondary"
            size="icon"
            onClick={handleDownload}
        >
            <DownloadIcon className="size-4" />
        </Button>
    )
}