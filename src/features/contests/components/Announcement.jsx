export default function Announcement({announcementList}) {
    return (
        <>
            <h3 className=" text-center p-4">Announcement</h3>
            {!announcementList.length && (
                <div>
                    <h3>No announcement yet!</h3>
                </div>
            )}
            {announcementList.length && (
                <div>
                    {announcementList.map((announcement, index) => {
                        {
                            announcement.length && (
                                <div
                                    key={index}
                                    className="p-4 m-4 rounded bg-cyan-950 text-white "
                                >
                                    <pre>{announcement}</pre>
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </>
    );
}
