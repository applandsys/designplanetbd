import React from 'react';
import CommonCard from "@/components/ui/CommonCard";
import TableData from "@/components/ui/TableData";
import Image from "next/image";
import config from "@/config";

const BannerList = ({banners}) => {

    const columns = [{
        id: 1,
        classes: '',
        value: 'ID'
    }, {
        id: 2,
        classes: '',
        value: 'Name'
    }, {
        id: 3,
        classes: '',
        value: 'Title'
    }, {
        id: 4,
        classes: '',
        value: 'Sub Title'
    }, {
        id: 5,
        classes: '',
        value: 'Slug'
    }, {
        id: 6,
        classes: '',
        value: 'Image Name'
    }, {
        id: 7,
        classes: '',
        value: 'Background Color'
    }, {
        id: 8,
        classes: '',
        value: 'Is Active'
    }, {
        id: 9,
        classes: 'text-right',
        value: 'Actions'
    }, ];


    return (
        <>
            <CommonCard title="Banners" key={1}>
                <div className="overflow-x-auto">
                    <TableData columns={columns}>
                        {banners.length && banners.map((banner, index) => (
                            <tr className="hover:bg-gray-50" key={banner.id}>
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{banner.name}</td>
                                <td className="px-4 py-2">{banner.title}</td>
                                <td className="px-4 py-2">{banner.sub_title}</td>
                                <td className="px-4 py-2">{banner.slug}</td>
                                <td className="px-4 py-2">
                                    <>
                                        {banner.image && (
                                            <>
                                                <Image className="h-6 w-6" src={`${config.publicPath}/images/banners/${banner.image}`} alt={`${banner.name}`} width={32} height={32} />
                                            </>
                                        )}
                                    </>
                                </td>
                                <td className="px-4 py-2">{banner.background_color}</td>
                                <td className="px-4 py-2">{banner.is_active ? 'Active' : 'Inactive'}</td>
                                <td className="px-4 py-2 text-right">
                                    <button className="mx-1 px-2 py-1 text-xs text-white bg-blue-400 rounded hover:bg-blue-300">Edit</button>
                                    <button className="mx-1 px-2 py-1 text-xs text-white bg-red-400 rounded hover:bg-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </TableData>

                </div>
            </CommonCard>
        </>
    );
};

export default BannerList;