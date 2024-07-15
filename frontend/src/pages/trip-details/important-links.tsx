import { Link2, Plus } from 'lucide-react';
import { Button } from '../../components/button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';

interface Links {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks() {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Links[] | undefined>();

  useEffect(() => {
    api.get(`/trips/${tripId}/links`)
      .then(response => setLinks(response.data.links)) // Adjusted to `links`

  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">
        Links Importantes
      </h2>

      <div className="space-y-5">
        {links?.map((link: Links) => (
          <div key={link.id} className="flex items-center justify-between gap-4"> {/* Added key prop */}
            <div className="space-y-1.5">
              <span className="block font-medium">{link.title}</span>
              <a href={link.url} className="block text-xs text-zinc-400 truncate hover:text-zinc-200" target="_blank" rel="noopener noreferrer">
                {link.url}
              </a>
            </div>
            <Link2 className="size-5 text-zinc-400 shrink-0" />
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full">
        <Plus size={20} className="text-zinc-200" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
