import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Home, BarChart3, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import Icon from "./Icon";
import IconButton from "./IconButton";
import HomeButton from "./HomeButton";

interface Results {
  message: string;
    room: {
        question: string;
        code: string;
        id: number;
        createdAt: string;
    };
    results: {
        yes: number;
        no: number;
        total: number;
    };
}

function Results() {
  const {roomCode} = useParams();

    const navigate = useNavigate();

    const [results, setResults] = useState<Results | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorPage, setErrorPage] = useState(false);

   
    useEffect(() => {
      console.log(roomCode);
      if(roomCode !== null){
        getResults();
        setLoading(false);
      }
    }, [roomCode]);
 
    async function getResults(){

        try {
            const response = await fetch(`https://voteit.onrender.com/api/rooms/${roomCode}/results`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
      
            if (!response.ok) {
              navigate('/');
              setErrorPage(true);
              throw new Error('Failed to get results');
            }
      
            const roomData = await response.json();
            setResults(roomData);

            console.log(roomData);
            
            
          } catch (error) {
            console.error('Error getting results:', error);
            navigate('/');
            setErrorPage(true);
          }


    }

    function goHome(){
        navigate('/');
    }

    console.log(results);

    if(loading){
        return <div className="container">
        <div className="content">
          <div className="w-full flex flex-col gap-4">
            <div className="text-2xl font-bold text-center">Loading...</div>
          </div>
        </div>
      </div>;
    }

    if(errorPage){
      return <div className="container">
        <div className="content">
          <div className="w-full flex flex-col gap-4">
            <div className="text-2xl font-bold text-center">Room not found</div>
          </div>
        </div>
      </div>
    }

    return <div className="container">
      <HomeButton />

        <div className="content">

          <div className="text-2xl font-bold text-center">{results?.room?.question}</div>

          {results ? (
          <div>{results?.results?.yes > results?.results?.no ? 
          <Icon className="bg-[#10B981]" icon={<ThumbsUp className="h-8 w-8" />}/> : 
          results?.results?.no === results?.results?.yes ? <Icon icon={<BarChart3 className="h-8 w-8" />}/> : <Icon className="bg-[#EF4444]" icon={<ThumbsDown className="h-8 w-8" />}/>
          }</div>
          ) : (
            <div>No votes yet</div>
          )}

          <div className="bg-white flex items-center justify-center w-full flex-col py-8 px-6 rounded-lg border-2 border-[#3D405B]">
            <div className="text-center font-semibold flex items-center justify-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Results</div>

              <div className="w-full flex flex-col gap-4">

              <div className="chart-result w-full flex flex-col gap-2">
                <div className="chart-legend text-sm flex items-center justify-between">
                  <div className=" text-[#10B981] font-semibold flex items-center justify-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    YES 
                    ({results?.results?.yes} votes)

                  </div>
                  <div className="text-slate-600">
                    {results ? Math.round(results?.results?.yes / results?.results?.total * 100) : 0}%
                  </div>

                </div>
                <div className="chart-line bg-[#10B981]"
                style={{
                  width: `${results ? Math.round(results?.results?.yes / results?.results?.total * 100) : 0}%`
                }}
                >

                </div>

              </div>

              <div className="chart-result w-full flex flex-col gap-2">
                <div className="chart-legend text-sm flex items-center justify-between">
                  <div className=" text-[#EF4444] font-semibold flex items-center justify-center gap-2">
                    <ThumbsDown className="h-4 w-4" />
                    NO 
                    ({results?.results?.no} votes)

                  </div>
                  <div className="text-slate-600">
                    {results ? Math.round(results?.results?.no / results?.results?.total * 100) : 0}%
                  </div>

                </div>
                <div className="chart-line bg-[#EF4444] w-full"
                style={{
                  width: `${results ? Math.round(results?.results?.no / results?.results?.total * 100) : 0}%`
                }}
                >

                </div>

              </div>
              </div>


          </div>

          <div className="text-center text-sm">Thanks for using {' '}
            <span className="text-[#E07A5F] font-semibold">VoteIt!</span> 🗳️</div>

          <div className="flex wrap:nowrap gap-2">
        <IconButton className="button-primary" onClick={() => {}} icon={<Share2 className="h-4 w-4" />}/>
        <IconButton className="button-primary" onClick={goHome} icon={<Home className="h-4 w-4" />}/>
        </div>
      
      </div>

    </div>
}

export default Results;