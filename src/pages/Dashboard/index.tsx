import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import LeftSide from './LeftSide'
import MiddleSide from './MiddleSide'
import RightSide from './RightSide'

import Loading from '../../components/Loading'

import exampleData from '../../assets/data/example_data.json'

import useAppSelector from '../../hooks/useAppSelector'
import { selectDatasetData, selectDatasetStatus } from '../../redux/slices/dataset/selectors'

import Status from '../../shared/status'

import '../../assets/styles/pages/dashboard/Dashboard.scss'

const Dashboard: React.FC = () => {
	const dataset = useAppSelector(selectDatasetData)
	const status = useAppSelector(selectDatasetStatus)

	const { pathname } = useLocation()
	const isLoaded = status === Status.LOADED

	const [data, setData] = React.useState<any>(exampleData)
	const [currentYear, setCurrentYear] = React.useState<string>(data?.Years[0] as string)

	const currentDatasetByYear = data.Datasets.find((d: any) => d.Year === currentYear) // Дадасет выбранного года

	React.useEffect(() => {
		isLoaded && setData(dataset)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status])

	if ((status === Status.UNSET || status === Status.ERROR) && pathname.split('/')[2] === 'uploaded') {
		return <Navigate to='/' />
	}

	return !isLoaded && pathname.split('/')[2] === 'uploaded' ? (
		<Loading />
	) : (
		<div className='content'>
			<LeftSide data={currentDatasetByYear} years={data?.Years} {...{ currentYear, setCurrentYear }} />
			<MiddleSide data={currentDatasetByYear} />
			<RightSide data={currentDatasetByYear} />
		</div>
	)
}

export default Dashboard
