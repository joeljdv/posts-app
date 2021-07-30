class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id

  belongs_to :post
  belongs_to :user
end