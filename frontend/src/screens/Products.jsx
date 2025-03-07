import React, { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import CardProduct from '../components/card/cardProduct';
import Pagination from '../components/common/Pagination';
import MainLayout from '../components/layout/MainLayout';
import MenuSideBar from '../components/layout/MenuSideBar';
import SpinnerLoading from '../components/loading/SpinnerLoading';
import { loadProducts } from '../store/ProductSlice';

const Products = () => {
	const productsSelector = useSelector((state) => state.entities.product);
	const dispatch = useDispatch();
	const [isMounted, setisMounted] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize] = useState(10);
	const [itemsCount, setItemsCount] = useState(10);

	const onFilter = ({ target }) => {
		console.log('filter=>', target.name, '=>', target.value);
	};
	const onSearch = ({ target }) => {
		// console.log('search ', target.value);
		// dispatch(searchProduct(target.value));
		// console.log('search ==>', productsSelector);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
		dispatch(loadProducts(page));
	};
	useEffect(() => {
		batch(() => {
			dispatch(loadProducts());
		});
	}, [dispatch]);

	useEffect(() => {
		const { params } = productsSelector.list;
		if (params) {
			setCurrentPage(params.page);
			setItemsCount(params.totalProducts);
		}

		return () => {
			setisMounted(true);
		};
	}, [dispatch, isMounted, productsSelector]);

	return (
		<MainLayout>
			<h1 className='text-3xl'>Liste des produits</h1>
			<div className='grid grid-cols-5 gap-5 mt-10'>
				{/* menu of the sidebar */}
				<div className='xl:col-span-1 lg:col-span-1  col-span-5 mt-9'>
					<MenuSideBar />
				</div>
				{/* end menu of the sidebar */}
				{/* list products*/}

				<div className='2xl:col-span-4 xl:col-span-4 lg:col-span-4  col-span-5 '>
					<div className='pt-2 relative ml-7 inline-block mx-auto text-gray-600'>
						<input
							className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
							type='search'
							name='search'
							placeholder='Search'
							onChange={onSearch}
						/>
					</div>
					<div className='inline-block float-right mr-5'>
						<select
							className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							onChange={onFilter}
							name='filter'
						>
							<option value='recent'>Tri du plus récent au plus ancien</option>
							<option value='desc'>Tri par tarif décroissant</option>
							<option value='asc'>Tri par tarif croissant</option>
						</select>
					</div>
					{productsSelector.loading ? (
						<SpinnerLoading />
					) : (
						<>
							<div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6  p-8'>
								{productsSelector.list.products.map((p) => (
									<CardProduct key={p._id} product={p} />
								))}
							</div>
							<Pagination
								currentPage={currentPage}
								itemsCount={itemsCount}
								pageSize={pageSize}
								onPageChange={(page) => handlePageChange(page)}
							/>
						</>
					)}
				</div>
				{/* end list products*/}
			</div>
		</MainLayout>
	);
};

export default Products;
