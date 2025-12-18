'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { productsAPI } from '@/lib/api'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const productId = parseInt(params.id as string)
  
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadProduct()
  }, [router, productId])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await productsAPI.get(productId)
      setProduct(data.product)
    } catch (error) {
      console.error('Failed to load product:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  if (!product) {
    return (
      <Layout>
        <div className="p-8">
          <div className="text-center text-gray-500">Product not found</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6">
          <Link href="/products" className="text-blue-600 hover:text-blue-900 mb-4 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600">Product Details</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-3xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">SKU</label>
              <p className="text-lg font-semibold text-gray-900">{product.sku}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">HSN Code</label>
              <p className="text-lg text-gray-900">{product.hsn_code || '-'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Unit</label>
              <p className="text-lg text-gray-900">{product.unit}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Category</label>
              <p className="text-lg text-gray-900">{product.category_id || 'No Category'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Purchase Price</label>
              <p className="text-lg text-gray-900">{formatCurrency(product.purchase_price || 0)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Sale Price</label>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(product.sale_price || 0)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Tax Rate</label>
              <p className="text-lg text-gray-900">{product.tax_rate}%</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Current Stock</label>
              <p className={`text-lg font-semibold ${
                product.current_stock <= product.reorder_level && product.reorder_level > 0
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}>
                {product.current_stock} {product.unit}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Reorder Level</label>
              <p className="text-lg text-gray-900">{product.reorder_level || '-'} {product.unit}</p>
            </div>
            {product.description && (
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-900 mt-1">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

