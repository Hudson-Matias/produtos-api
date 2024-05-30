import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductNotFoundException } from './exceptions/product-not-found.exception';

export interface Product {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private currentId = 1;

  create(createProductDto: CreateProductDto): Product {
    const newProduct = { id: this.currentId++, ...createProductDto };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((prod) => prod.id === id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    Object.assign(product, updateProductDto);
    return product;
  }

  remove(id: number): void {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      throw new ProductNotFoundException(id);
    }
    this.products.splice(productIndex, 1);
  }
}
