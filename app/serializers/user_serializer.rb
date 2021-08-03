class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_img

  has_many :posts
end
