import Paragraph from './ui/Paragraph'

const LocationAddress = () => {
  return (
    <table className="table-auto">
      <tbody>
        <tr>
          <td>
            <Paragraph className="font-semibold">
              Mail:
            </Paragraph>
          </td>
          <td className="pl-2 py-1">
            <Paragraph className='text-[15px]'>
              info@dewassendemaan.be
            </Paragraph>
          </td>
        </tr>
        <tr>
          <td>
            <Paragraph className="font-semibold">
              Tel:
            </Paragraph>
          </td>
          <td className="pl-2 py-1">
            <Paragraph className='text-[15px]'>
              +32 (0)9 386 82 14
            </Paragraph>
          </td>
        </tr>
        <tr>
          <td>
            <Paragraph className="font-semibold">
              Adres:
            </Paragraph>
          </td>
          <td className="pl-2 py-1">
            <Paragraph className='text-[15px]'>
              Beekstraat 35
              <br />
              9800 Astene-Deize
            </Paragraph>
          </td>
        </tr>
        <tr>
          <td>
            <Paragraph className="font-semibold">
              BTW:
            </Paragraph>
          </td>
          <td className="pl-2 py-1">
            <Paragraph className='text-[15px]'>
              BE0429.289.336
            </Paragraph>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default LocationAddress