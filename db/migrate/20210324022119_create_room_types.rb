class CreateRoomTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :room_types do |t|
      t.references :hotel, null: false, foreign_key: true
      t.string :name
      t.boolean :available

      t.timestamps
    end

    add_index :room_types, [:hotel_id, :name], unique: true
  end
end
