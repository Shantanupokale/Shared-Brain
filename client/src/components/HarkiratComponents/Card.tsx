import { Shareicon } from "@/icons/Shareicon";



interface Cardprops{
    title : string;
    link:string;
    type:"twitter" | "youtube";
}


export function Card({title ,link , type}:Cardprops){
return (
  <div className="p-4 bg-slate-100 max-w-96 border  border-black rounded-lg ">
    <div>
        {/* header */}
        <div className=" flex justify-between items-center">
            {/* leftheader */}
            <div className="flex ">
                <div className="flex">
                    <Shareicon />
                </div>
            </div>

             {title}

             {/* right header */}
            <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        {/* Clickable Share Icon that opens the link */}
                        <a href={link} target="_blank">
                            <Shareicon />
                        </a>
                    </div>
                    <div className="text-gray-500">
                        {/* Placeholder for another Share Icon */}
                        <Shareicon />
                    </div>
            </div>
        </div>

        {/* content section */}
        <div className="pt-4">
                    {/* Render YouTube embed if type is "youtube" */}
                    {type === "youtube" && (
                        <iframe
                            className="w-full"
                            src={link
                                .replace("watch", "embed")
                                .replace("?v=", "/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {/* Render Twitter embed if type is "twitter" */}
                    {type === "twitter" && (
                        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                        <blockquote className="twitter-tweet">
                          <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                      </div>
                    )}
                </div>
    </div>
  </div>
);
}