import de.bwaldvogel.mongo.MongoServer;
import de.bwaldvogel.mongo.backend.memory.MemoryBackend;

public class MongoServerMain {
    public static void main(String[] args) {
        MongoServer server = new MongoServer(new MemoryBackend());
        server.bind("localhost", 27017);
        System.out.println("Started in-memory MongoDB on localhost:27017");
    }
}
