import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import RoomTypeField from './RoomTypeField'

const RoomTypesArrayField = ({
  initialValue,
}) => {
  const [tempIdCounter, setTempIdCounter] = useState(0)
  const [roomTypes, setRoomTypes] = useState(initialValue)

  const handleClickAdd = useCallback(() => {
    setTempIdCounter(tempIdCounter + 1)
    setRoomTypes([...roomTypes, {
      available: false,
      id: null,
      name: '',
      tempId: tempIdCounter,
    }])
  }, [tempIdCounter, setTempIdCounter, roomTypes, setRoomTypes])

  const handleOnDelete = useCallback(({ id, tempId }) => {
    const roomTypeIndexToDelete = roomTypes.findIndex((e) => e.id === id && e.tempId === tempId)
    const roomTypeToDelete = roomTypes[roomTypeIndexToDelete]

    if (id) {
      setRoomTypes([
        ...roomTypes.slice(0, roomTypeIndexToDelete),
        { ...roomTypeToDelete, _destroy: true },
        ...roomTypes.slice(roomTypeIndexToDelete + 1),
      ])
    } else {
      setRoomTypes(roomTypes.filter((_, i) => i !== roomTypeIndexToDelete))
    }
  }, [roomTypes, setRoomTypes])

  return (
    <>
      <div className="form-group">
        <label className="mr-2">Room Types</label>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleClickAdd}
          type="button"
        >
          Add
        </button>
      </div>
      { roomTypes.map((roomType, i) => (
        <RoomTypeField
          index={i}
          initialValue={roomType}
          key={`${roomType.id}_${roomType.tempId}`}
          onDelete={handleOnDelete}
        />
      )) }
    </>
  )
}

RoomTypesArrayField.propTypes = {
  initialValue: PropTypes.arrayOf(
    PropTypes.shape({
      available: PropTypes.bool,
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default RoomTypesArrayField