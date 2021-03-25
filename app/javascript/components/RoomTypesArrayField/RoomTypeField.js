import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

const RoomTypeField = ({
  index,
  initialValue,
  initialValue: { id, tempId, _destroy: isMarkedDestroy },
  onDelete,
}) => {
  const [name, setName] = useState(initialValue.name)
  const [available, setAvailable] = useState(initialValue.available)
  const handleNameChange = useCallback((e) => {
    setName(e.target.value)
  }, [setName])
  const handleAvailableChange = useCallback((e) => {
    setAvailable(e.target.checked)
  }, [setAvailable])
  const handleDeleteClick = useCallback(() => {
    onDelete && onDelete({ id, tempId })
  }, [onDelete, id, tempId])

  if (isMarkedDestroy) {
    return (
      <>
        <input
          name={`hotel[room_types_attributes][${index}][id]`}
          type="hidden"
          value={id}
        />
        <input
          name={`hotel[room_types_attributes][${index}][_destroy]`}
          type="hidden"
          value="1"
        />
      </>
    )
  }

  return (
    <div className="form-group row">
      { id && (
        <input
          name={`hotel[room_types_attributes][${index}][id]`}
          type="hidden"
          value={id}
        />
      )}
      <label
        className="col-form-label col-sm-1"
        htmlFor={`hotel_room_types_attributes_${index}_name`}
      >
        Name
      </label>
      <input
        className="form-control col-sm-8"
        id={`hotel_room_types_attributes_${index}_name`}
        name={`hotel[room_types_attributes][${index}][name]`}
        onChange={handleNameChange}
        type="text"
        value={name}
      />
      <div className="col-sm-2 d-flex align-items-center justify-content-center">
        <div className="form-check form-check-inline">
          <input
            name={`hotel[room_types_attributes][${index}][available]`}
            type="hidden"
            value="0"
          />
          <input
            checked={available}
            className="form-check-input"
            id={`hotel_room_types_attributes_${index}_available`}
            name={`hotel[room_types_attributes][${index}][available]`}
            onChange={handleAvailableChange}
            type="checkbox"
            value="1"
          />
          <label
            className="form-check-label"
            htmlFor={`hotel_room_types_attributes_${index}_available`}
          >
            Available
          </label>
        </div>
      </div>
      <button
        className="btn btn-danger btn-sm col-sm-1"
        onClick={handleDeleteClick}
        type="button"
      >
        Delete
      </button>
    </div>
  )
}

RoomTypeField.propTypes = {
  index: PropTypes.number.isRequired,
  initialValue: PropTypes.shape({
    _destroy: PropTypes.bool,
    available: PropTypes.bool,
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    tempId: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
}

export default RoomTypeField