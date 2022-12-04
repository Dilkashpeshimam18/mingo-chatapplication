import React from 'react'

const ProfileMedia = () => {
    return (
        <div>
            <div className="profile-media">
                <div className='profile-media-header'>
                    <h3 className='profile-title'>
                        Media
                    </h3>
                </div>
                <div className='media-image-container'>
                    <img className='media-image' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' />
                    <img className='media-image' src='https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?b=1&k=20&m=517188688&s=612x612&w=0&h=x8h70-SXuizg3dcqN4oVe9idppdt8FUVeBFemfaMU7w=' />
                    <img className='media-image' src='https://media.istockphoto.com/photos/image-of-open-antique-book-on-wooden-table-with-glitter-overlay-picture-id1354441996?b=1&k=20&m=1354441996&s=170667a&w=0&h=O4JDagXhIh1N13PNN6G4_L5KB5QPZryin7FOrZnzYvc=' />
                    <img className='media-image' src='https://media.istockphoto.com/photos/image-of-open-antique-book-on-wooden-table-with-glitter-overlay-picture-id1354441996?b=1&k=20&m=1354441996&s=170667a&w=0&h=O4JDagXhIh1N13PNN6G4_L5KB5QPZryin7FOrZnzYvc=' />
                    <img className='media-image' src='https://b.rgbimg.com/users/j/jo/johnnyberg/600/n8pqYs8.jpg' />
                    <img className='media-image' src='https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws=' />

                </div>
                <div className='media-btn'>
                    <button className='media-viewAll'>View all</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileMedia