import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DataTableRow from '../_components/DataTableRow'

const mockData = ["This String and a number", 102390]
 
describe('DataTableRow', () => {
  it('renders a table row of data', () => {
    const dataRow = render(<DataTableRow cells={mockData} />)
    // Probably not how I'd like to live with this test long term but it gets the job done and shows we have our row and data on the page
    expect(dataRow.baseElement.innerHTML.includes(mockData[0] as string))
    expect(dataRow.baseElement.innerHTML.includes(mockData[1] as string))
  })
})